import { TMap, TmapResponse } from "../types";

export default function useMapSearch(
  onComplete: (data: { _responseData: TmapResponse }) => void,
  map: TMap | null,
) {
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

  return { search };
}
