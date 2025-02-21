import {
  MapOptions,
  TMap,
  TMapLatLng,
  TMapMarker,
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
        };
      };
      Map: {
        new (element: HTMLElement | string, options?: any): TMap;
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
    };
  }
}

export {};
