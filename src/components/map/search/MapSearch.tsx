"use client";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Poi,
  PoiDetail,
  TMap,
  TMapLatLng,
  TMapMarker,
  TmapResponse,
} from "@/src/types";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ILocation } from "@/src/hooks/useGeoLocation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useMapSearch from "@/src/hooks/useMapSearch";
import MapSearchList from "./MapSearchList";
import MapSearchResult from "./MapSearchResult";

const formSchema = z.object({
  search: z.string(),
});

type Props = {
  map: TMap | null;
  location?: ILocation;
};

export default function MapSearch({ map, location }: Props) {
  const router = useRouter();

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [results, setResults] = useState<Poi[]>([]);
  const [welfares, setWelfares] = useState<Poi[]>([]);
  const [target, setTarget] = useState<PoiDetail | null>(null);
  const markers = useRef<TMapMarker[]>([]);
  const targetMarker = useRef<TMapMarker | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });
  const searchValue = form.getValues("search");

  const reset = () => {
    markers.current.forEach((marker) => marker.setMap(null));
    setResults(() => []);
    markers.current = [];
    setTarget(null);
  };

  const addMarker = (
    lonlatoption: Poi & { title: string; lonlat: TMapLatLng },
  ) => {
    const { Tmapv2 } = window;
    if (!Tmapv2 || !map) return;

    const filteredArr = markers.current.filter(
      (prevMark) => prevMark._marker_data.id === lonlatoption.id,
    );
    if (filteredArr.length !== 0) return;
    const marker = new Tmapv2.Marker({
      id: lonlatoption.id,
      animation: Tmapv2.MarkerOptions.ANIMATE_DROP,
      position: new Tmapv2.LatLng(
        lonlatoption.lonlat._lat,
        lonlatoption.lonlat._lng,
      ),
      map: map,
      title: lonlatoption.title,
      icon: "/imgs/poi-marker.png",
    });
    marker.addListener("click", async () => {
      handleClickItem(lonlatoption);
    });
    marker.addListener("touchend", async () => {
      handleClickItem(lonlatoption);
    });
    markers.current.push(marker);
  };

  const addTargetMarker = (poi: Poi) => {
    const { Tmapv2 } = window;
    if (!Tmapv2 || !map) return;
    if (targetMarker.current) {
      targetMarker.current.setMap(null);
    }
    const id = poi.id;
    const lon = poi.frontLon;
    const lat = poi.frontLat;
    const lonlatoption = {
      ...poi,
      id,
      title: poi.name,
      lonlat: new Tmapv2.LatLng(Number(lat), Number(lon)),
    };
    const marker = new Tmapv2.Marker({
      id: lonlatoption.id,
      animation: Tmapv2.MarkerOptions.ANIMATE_BALLOON,
      position: new Tmapv2.LatLng(
        lonlatoption.lonlat._lat,
        lonlatoption.lonlat._lng,
      ),
      map: map,
      title: lonlatoption.title,
      icon: "/imgs/click-marker.png",
      iconSize: new Tmapv2.Size(40, 50),
    });
    targetMarker.current = marker;
    setIsFocus(true);
  };

  const handleRemoveTargetMarker = () => {
    if (!targetMarker.current) return;
    targetMarker.current.setMap(null);
    setTarget(null);
    targetMarker.current = null;
  };

  const onComplete = (data: { _responseData: TmapResponse }) => {
    const { Tmapv2 } = window;
    if (!Tmapv2) return;
    if (!map) return;
    if (
      !data._responseData.searchPoiInfo ||
      !data._responseData.searchPoiInfo.pois.poi.length
    ) {
      return alert("검색결과가 없습니다.");
    }
    data._responseData.searchPoiInfo.pois.poi.forEach((poi) => {
      const name = poi.name;
      const id = poi.id;
      const lon = poi.frontLon;
      const lat = poi.frontLat;
      const lonlatoption = {
        ...poi,
        id,
        title: name,
        lonlat: new Tmapv2.LatLng(Number(lat), Number(lon)),
      };
      addMarker(lonlatoption);
      setResults((prev) => {
        const newArr = [...prev, poi];
        return [...new Map(newArr.map((item) => [item.id, item])).values()];
      });
    });
    const center = map.getCenter();
    map.setCenter(new Tmapv2.LatLng(center._lat, center._lng));
    map.setZoom(14);
  };

  const { search } = useMapSearch(onComplete, map);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    reset();
    if (values.search) search(values.search);
  };

  const setMapCenter = (lonlat: TMapLatLng) => {
    if (!map) return;
    map.setCenter(lonlat);
  };

  const handleClickItem = async (newTarget: Poi) => {
    const { Tmapv2 } = window;
    if (!Tmapv2) return;
    const lonlat = new Tmapv2.LatLng(
      Number(newTarget.frontLat),
      Number(newTarget.frontLon),
    );
    const tData = new Tmapv2.extension.TData();

    tData.getPOIDataFromIdJson(
      newTarget.id,
      {},
      {
        onComplete: (res: { _responseData: TmapResponse }) => {
          setMapCenter(lonlat);
          setTarget(newTarget);
          const data = res._responseData.poiDetailInfo;
          setTarget({ ...newTarget, ...data });
          addTargetMarker(newTarget);
        },
        onProgress: () => console.log("POI 데이터 패칭 중.."),
        onError: () => alert("알수없는 오류가 발생했습니다."),
      },
    );
  };

  const handleClickDirection = (poi: PoiDetail) => {
    router.push(
      `/map/direction?end=${poi.frontLon},${poi.frontLat},${poi.name}`,
    );
  };

  useEffect(() => {
    const handleGetNear = async () => {
      try {
        const { Tmapv2 } = window;
        if (!Tmapv2 || !map) return;
        const center = map.getCenter();
        map.setCenter(new Tmapv2.LatLng(center._lat, center._lng));
        const res = await fetch(
          `https://apis.openapi.sk.com/tmap/pois/search/around?version=1&page=1&count=20&categories=복지시설&centerLon=${center._lng}&centerLat=${center._lat}&radius=1&appKey=${process.env.NEXT_PUBLIC_TMAP_API_KEY}`,
        );
        if (!res.ok) throw new Error("ERROR: GET 주변 복지시설 ");
        const data = await res.json();
        if (!data.searchPoiInfo) return;
        const mergedData = Object.values(
          data.searchPoiInfo.pois.poi.reduce(
            (acc: { [key: string]: Poi }, obj: Poi) => {
              if (!acc[obj.id]) {
                acc[obj.id] = { ...obj };
              } else {
                acc[obj.id] = {
                  ...acc[obj.id],
                  ...obj,
                };
              }
              return acc;
            },
            {},
          ),
        ) as Poi[];
        setWelfares(mergedData);
      } catch (err) {
        console.error(err);
      }
    };
    handleGetNear();
  }, [map, location]);

  return (
    <div className="w-full max-w-[calc(100%-32px)] relative">
      {isFocus && (
        <Button
          onClick={() => setIsFocus(false)}
          className="absolute top-[10px] right-5 flex md:hidden w-7 h-7"
          size="icon"
          variant={"ghost"}
        >
          <XMarkIcon className="!size-5" />
        </Button>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="검색어를 입력해주세요."
                    className="h-12 theme-content-bg placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border theme-line px-2 !m-0"
                    onFocus={() => setIsFocus(true)}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red px-2" />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className={cn("hidden md:block", isFocus && "block")}>
        {target ? (
          <MapSearchResult
            target={target}
            onClose={handleRemoveTargetMarker}
            onClick={handleClickDirection}
          />
        ) : searchValue ? (
          <MapSearchList results={results} onClick={handleClickItem} />
        ) : (
          <div className="flex flex-col py-2 max-h-[calc(100vh-126px)]">
            <div className="flex-grow flex flex-col gap-2 overflow-y-auto">
              <div className="flex flex-col gap-2 theme-content-bg px-2 py-3 md:py-4 rounded-md">
                <div className="text-sm theme-map-welfare-facilities font-medium mb-2">
                  주변 복지시설{" "}
                  <span className="text-xs font-bold">{welfares.length}</span>
                </div>
                {welfares.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleClickItem(item)}
                    className="theme-content-bg py-3 md:py-4 rounded-md cursor-pointer hover:theme-hover transition-all font-semibold"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
