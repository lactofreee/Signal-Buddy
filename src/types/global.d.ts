import {
  MapOptions,
  TMap,
  TMapLatLng,
  TMapMarker,
  TMapPolyline,
  TMapMarkerOptions,
  TMapSize,
} from "@/src/types";

declare global {
  interface Window {
    Tmapv2: {
      extension: {
        TData: new () => {
          getPOIDataFromSearchJson: (
            string,
            {
              reqCoordType: string,
              resCoordType: string,
              centerLon: number,
              centerLat: number,
            },
            {},
          ) => void;
          getRoutePlanForPeopleJson: (
            startLatLng: TMapLatLng,
            endLatLng: TMapLatLng,
            starName: string,
            endName: string,
            optionObj,
            {},
          ) => void;
          getPOIDataFromIdJson: (string, {}, {}) => void;
        };
      };
      Map: {
        new (element: HTMLElement | string, options?: MapOptions): TMap;
        MapType: {
          SATELLITE: 4;
          HYBRID: 5;
          ROAD: 1;
        };
      };
      LatLng: new (lat: number, lon: number) => TMapLatLng;
      Marker: {
        new (options?: TMapMarkerOptions): TMapMarker;
      };
      Size: new (width: number, height: number) => TMapSize;
      MarkerOptions: {
        [key: string]: number;
      };
      Polyline: new (options?: {
        path: TMapLatLng[];
        strokeColor: string;
        strokeWeight: number;
        outline: boolean;
        map: Tmap;
      }) => TMapPolyline;
      Circle: new (options?: {
        center: TMapLatLng;
        radius: number;
        fillColor: string;
        strokeColor: string;
        map: Tmap;
      }) => TMapCircle;
    };
  }
}

export {};
