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
import { Poi, TMap, TMapLatLng, TMapMarker, TmapResponse } from "@/src/types";
import { useState } from "react";
import { XIcon } from "lucide-react";

const formSchema = z.object({
  search: z.string().min(1, {
    message: "검색어를 입력해주세요.",
  }),
});

type Props = {
  map: TMap | null;
};

export default function MapSearch({ map }: Props) {
  const [results, setResults] = useState<Poi[]>([]);
  const [markers, setMarkers] = useState<TMapMarker[]>([]);
  const [target, setTarget] = useState<Poi | null>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });
  const searchValue = form.getValues("search");

  const reset = () => {
    setResults(() => []);
    markers.forEach((marker) => marker.setMap(null));
    setMarkers(() => []);
    setTarget(null);
  };

  const addMarker = (
    lonlatoption: Poi & { title: string; lonlat: TMapLatLng },
  ) => {
    const { Tmapv2 } = window;
    if (!Tmapv2 || !map) return;
    const marker = new Tmapv2.Marker({
      id: lonlatoption.id,
      position: new Tmapv2.LatLng(
        lonlatoption.lonlat._lat,
        lonlatoption.lonlat._lng,
      ),
      map: map,
      title: lonlatoption.title,
    });
    marker.addListener("click", async () => {
      console.log(lonlatoption);
      setTarget(lonlatoption);
    });
    setMarkers((prev) => [...prev, marker]);
  };

  const onComplete = (data: { _responseData: TmapResponse }) => {
    const { Tmapv2 } = window;
    if (!Tmapv2) return;
    if (!map) return;
    if (!data._responseData.searchPoiInfo.pois.poi.length) {
      alert("검색결과가 없습니다.");
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

  const search = (value: string) => {
    const { Tmapv2 } = window;
    if (!Tmapv2) return;
    if (!map) return;
    const center = map.getCenter();
    const optionObj = {
      reqCoordType: "WGS84GEO", //요청 좌표계 옵셥 설정입니다.
      resCoordType: "WGS84GEO", //응답 좌표계 옵셥 설정입니다.
      centerLon: center._lng, //POI검색시 중앙좌표의 경도입니다.
      centerLat: center._lat, //POI검색시 중앙좌표의 위도입니다.
    };
    const params = {
      onComplete,
      onProgress: () => console.log("진행중..."),
      onError: () => alert("Error: 그런 건 없을지도..?"),
    };
    const tData = new Tmapv2.extension.TData();
    tData.getPOIDataFromSearchJson(
      encodeURIComponent(value),
      optionObj,
      params,
    );
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    reset();
    search(values.search);
  }

  return (
    <div className="relative">
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
                    className="h-12 placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border border-gray-300 px-2 !m-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red px-2" />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {target ? (
        <div className="flex flex-col">
          <div className="flex items-center justify-between py-2">
            <div className="flex gap-1 text-sm">
              <div>{target.middleAddrName}</div>
              <div>{target.lowerAddrName}</div>
              <div>{target.middleBizName}</div>
            </div>
            <button onClick={() => setTarget(null)}>
              <XIcon />
            </button>
          </div>
          <div className="font-bold text-2xl">{target.name}</div>
        </div>
      ) : searchValue ? (
        <div className=" absolute w-full flex flex-col gap-2 max-h-[calc(100vh-126px)] overflow-y-auto py-4">
          {results.map((result) => (
            <div
              onClick={() => setTarget(result)}
              key={result.id}
              className="bg-white p-4 rounded-md cursor-pointer hover:bg-gray-200 transition-all"
            >
              {result.name}
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
