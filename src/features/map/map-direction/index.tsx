"use client";

import { ILocation } from "@/src/hooks/use-geo-location";
import {
  Poi,
  PoiDetail,
  RouteFeature,
  TMap,
  TMapLatLng,
  TMapMarker,
  TmapResponse,
} from "@/src/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { formatDistance, formatFutureTime, formatSeconds } from "@/src/utils";
import useMapSearch from "@/src/hooks/use-map-search";
import { Button } from "@/src/components/ui/button";
import {
  MagnifyingGlassIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/solid";
import useMapDirection from "@/src/hooks/use-map-direction";
import MapSearchList from "../map-search/components/map-search-list";
import MapDirectionItem from "./components/map-direction-item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
// import { getSpeech } from "@/src/utils/getSpeeech";

const formSchema = z.object({
  start: z.string(),
  end: z.string(),
});

type Props = {
  map: TMap | null;
  location?: ILocation;
  getGEO: () => void;
  startWatching: () => void;
  stopWatching: () => void;
  isWatching: boolean;
};

export default function MapDirection({
  map,
  location,
  getGEO,
  startWatching,
  stopWatching,
  isWatching,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const [swiperIns, setSwiperIns] = useState<SwiperType | null>(null);

  const [target, setTarget] = useState<PoiDetail | null>(null);
  const [startTarget, setStartTarget] = useState<PoiDetail | null>(null);
  const [endTarget, setEndTarget] = useState<PoiDetail | null>(null);
  const targetMarker = useRef<TMapMarker | null>(null);

  const [focus, setFocus] = useState<"start" | "end">("start");
  const [results, setResults] = useState<Poi[]>([]);
  const [isSelect, setIsSelect] = useState<boolean>(false);

  const isFirstLocationSet = useRef(false);

  const formatLatLng = (target: string | null) => {
    if (!location) return null;
    if (!target)
      return { x: location.longitude, y: location.latitude, name: "내 위치" };
    const arr = target.split(",");
    const x = Number(arr[0]);
    const y = Number(arr[1]);
    const name = arr[2];
    return {
      x,
      y,
      name,
    };
  };

  const { routeFeatures, getRoute } = useMapDirection(map);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start: "내 위치",
      end: end ? end.split(",").pop() : "",
    },
  });

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
    setResults(data._responseData.searchPoiInfo.pois.poi);
    const center = map.getCenter();
    map.setCenter(new Tmapv2.LatLng(center._lat, center._lng));
    map.setZoom(14);
  };

  const { search } = useMapSearch(onComplete, map);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values[focus]);

    if (values[focus]) search(values[focus]);
  };

  const handleClickSearch = () => {
    if (targetMarker.current) {
      targetMarker.current.setMap(null);
    }

    setResults([]);
    const params = new URLSearchParams(searchParams);
    if (startTarget) {
      const startStr =
        startTarget.frontLon +
        "," +
        startTarget.frontLat +
        "," +
        startTarget.name;

      params.set("start", startStr);
    }
    if (endTarget) {
      const endStr =
        endTarget.frontLon + "," + endTarget.frontLat + "," + endTarget.name;
      params.set("end", endStr);
    }
    router.replace(`${pathname}?${params.toString()}`);
    setIsSelect(false);
    isFirstLocationSet.current = false;
    return;
  };

  const setMapCenter = (lonlat: TMapLatLng) => {
    if (!map) return;
    map.setCenter(lonlat);
    map.setZoom(19);
  };

  const addTargetMarker = (poi: Poi) => {
    const { Tmapv2 } = window;
    if (!Tmapv2 || !map) return;
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
  };

  const handleClickItem = async (newTarget: Poi) => {
    if (targetMarker.current && target) {
      targetMarker.current.setMap(null);
      setTarget(null);
    }
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
    form.setValue(focus, newTarget.name);
    if (focus === "start") setStartTarget(newTarget);
    else setEndTarget(newTarget);

    if (window.innerWidth < 768) {
      setResults([]);
    }
  };

  const handleSelectRoute = () => {
    if (targetMarker.current && target) {
      targetMarker.current.setMap(null);
      setTarget(null);
    }
    setIsSelect(true);
    setResults([]);
    startWatching();
  };

  const handleCancelRoute = () => {
    setIsSelect(false);
    stopWatching();
  };

  const handleClickFeatureItem = (feature: RouteFeature) => {
    const { Tmapv2 } = window;
    if (!Tmapv2) return;
    if (!map) return;
    if (feature.geometry.type === "Point") {
      const coord = feature.geometry.coordinates;
      map.setCenter(new Tmapv2.LatLng(coord[1], coord[0]));
    } else {
      const coord = feature.geometry.coordinates;
      map.setCenter(new Tmapv2.LatLng(coord[0][1], coord[0][0]));
    }
    map.setZoom(19);
  };
  const audioRef = useRef<HTMLAudioElement>(null);

  const generateSpeech = async (text: string) => {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      console.log(res);
      if (!res.ok) {
        alert("오디오 생성에 실패했습니다.");
        return;
      }

      const audioBlob = await res.blob();
      const url = URL.createObjectURL(audioBlob);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play(); // 바로 재생
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleClickSpeech = () => {
    if (swiperIns) {
      const activeIndex = swiperIns.activeIndex;
      // getSpeech(routeFeatures[activeIndex].properties.description);
      generateSpeech(routeFeatures[activeIndex].properties.description);
    } else {
      // getSpeech("300m 앞에서 우회전하세요.");
      generateSpeech("300m 앞에서 우회전하세요.");
    }
  };

  useEffect(() => {
    getGEO();
    if (isWatching) handleCancelRoute();
    return () => handleCancelRoute();
  }, []);

  useEffect(() => {
    if (!isFirstLocationSet.current && location) {
      getRoute(formatLatLng(start), formatLatLng(end));
      isFirstLocationSet.current = true;
    }
  }, [location, start, end]);

  return (
    <>
      <div className="w-full max-w-[calc(100%-32px)] relative flex flex-col gap-2">
        {isSelect ? (
          <>
            <div className="hidden md:flex justify-between gap-5 items-center">
              <Button
                onClick={handleClickSpeech}
                className="rounded-3xl theme-map-deraction-speaker-buttton"
                variant={"outline"}
              >
                <SpeakerWaveIcon />
                안내음 듣기
              </Button>
              <audio ref={audioRef} controls className="hidden" />
              <Button
                onClick={handleCancelRoute}
                className="bg-red w-full text-white theme-map-deraction-guide-finish-button"
              >
                안내 종료
              </Button>
            </div>
            {routeFeatures.length && (
              <div className="flex md:hidden h-[120px] whitespace-nowrap overflow-x-auto">
                <Swiper
                  onSwiper={(s) => setSwiperIns(s)}
                  pagination={{
                    dynamicBullets: true,
                    dynamicMainBullets: 3,
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {routeFeatures.map((feature, idx) => (
                    <SwiperSlide
                      key={`${feature.type}${Date.now()}${idx}`}
                      className="pb-4"
                    >
                      <MapDirectionItem
                        feature={feature}
                        onClick={() => handleClickFeatureItem(feature)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </>
        ) : (
          <>
            <Form {...form}>
              <form
                className="flex gap-1 "
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex-1 flex flex-col gap-1">
                  <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="출발지를 입력해주세요."
                            className="h-12 theme-content-bg placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border theme-line px-2 !m-0"
                            onFocus={() => setFocus("start")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red px-2" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="end"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="도착지를 입력해주세요."
                            className="h-12 theme-content-bg placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border thene-line px-2 !m-0"
                            onFocus={() => setFocus("end")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red px-2" />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  size="icon"
                  className="bg-gray-700 text-white p-2 h-full min-h-[100px] theme-map-deraction-search-button"
                >
                  <MagnifyingGlassIcon />
                </Button>
              </form>
            </Form>
            <Button
              onClick={handleClickSearch}
              className="bg-teal text-white font-bold theme-map-deraction-search-button"
              type="button"
            >
              길 찾기
            </Button>
          </>
        )}
        {results.length ? (
          <MapSearchList results={results} onClick={handleClickItem} />
        ) : (
          <>
            {routeFeatures.length > 0 && (
              <>
                {!isSelect ? (
                  <div className="hidden md:flex flex-col py-2 max-h-[calc(100vh-228px)]">
                    <div className="flex-grow flex flex-col gap-2 overflow-y-auto">
                      <div
                        onClick={handleSelectRoute}
                        className="w-full theme-map-deraction-search-result-box rounded-md py-3 px-2 cursor-pointer hover:opacity-70 transition-all flex justify-between"
                      >
                        <div>
                          <span className="text-xs theme-map-deraction-search-result-label font-semibold mb-2">
                            도보 경로
                          </span>
                          <h2 className="text-xl font-extrabold mb-1">
                            {"totalTime" in routeFeatures[0].properties
                              ? formatSeconds(
                                  routeFeatures[0].properties.totalTime || 0,
                                )
                              : "0"}
                          </h2>
                          <div className="text-sm theme-map-deraction-search-result-time font-medium mb-1">
                            {formatFutureTime(
                              "totalTime" in routeFeatures[0].properties
                                ? routeFeatures[0].properties.totalTime || 0
                                : 0,
                            )}{" "}
                            도착
                          </div>
                          <div className="text-xs theme-map-deraction-search-result-km">
                            {formatDistance(
                              "totalDistance" in routeFeatures[0].properties
                                ? routeFeatures[0].properties.totalDistance || 0
                                : 0,
                            )}
                          </div>
                        </div>
                        <Image
                          src={"/imgs/nav-walk.svg"}
                          alt="nav icon"
                          width={40}
                          height={40}
                          className={"dark:invert"}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:flex flex-col py-2 max-h-[calc(100vh-130px)]">
                    <div className="flex-grow flex flex-col gap-2 overflow-y-auto">
                      {routeFeatures.map((feature, idx) => (
                        <MapDirectionItem
                          feature={feature}
                          key={`${feature.type}${Date.now()}${idx}`}
                          onClick={() => handleClickFeatureItem(feature)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      {routeFeatures.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 theme-bg p-2 pb-4 md:hidden">
          {!isSelect ? (
            <div
              onClick={handleSelectRoute}
              className="w-full md:hidden theme-map-deraction-search-result-box rounded-md py-3 px-2 cursor-pointer hover:opacity-70 transition-all flex justify-between gap-4"
            >
              <div>
                <span className="text-xs theme-map-deraction-search-result-label font-semibold mb-2">
                  도보 경로
                </span>
                <h2 className="text-xl font-extrabold mb-1">
                  {"totalTime" in routeFeatures[0].properties
                    ? formatSeconds(routeFeatures[0].properties.totalTime || 0)
                    : "0"}
                </h2>
                <div className="text-sm theme-map-deraction-search-result-time font-medium mb-1">
                  {formatFutureTime(
                    "totalTime" in routeFeatures[0].properties
                      ? routeFeatures[0].properties.totalTime || 0
                      : 0,
                  )}{" "}
                  도착
                </div>
                <div className="text-xs theme-map-deraction-search-result-km">
                  {formatDistance(
                    "totalDistance" in routeFeatures[0].properties
                      ? routeFeatures[0].properties.totalDistance || 0
                      : 0,
                  )}
                </div>
              </div>
              <Image
                src={"/imgs/nav-walk.svg"}
                alt="nav icon"
                width={40}
                height={40}
                className={"dark:invert"}
              />
            </div>
          ) : (
            <div className="flex justify-between gap-5 items-center">
              <Button
                onClick={handleClickSpeech}
                className="rounded-3xl theme-map-deraction-speaker-buttton"
                variant={"outline"}
              >
                <SpeakerWaveIcon />
                안내음 듣기
              </Button>
              <Button
                onClick={handleCancelRoute}
                className="bg-red w-full text-white theme-map-deraction-guide-finish-button"
              >
                안내 종료
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
