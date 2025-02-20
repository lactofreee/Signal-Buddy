export type MapOptions = {
  center?: TMapLatLng;
  scaleBar?: boolean;
  width?: string | number;
  height?: string | number;
  zoom?: number;
  zoomControl?: boolean;
  scrollwheel?: boolean;
};

export type NewAddress = {
  centerLat: string;
  centerLon: string;
  frontLat: string;
  frontLon: string;
  fullAddressRoad: string;
};

export type NewAddressList = {
  newAddress: NewAddress[];
};

export type Poi = {
  id: string;
  pkey: string;
  navSeq: string;
  collectionType: string;
  name: string;
  telNo: string;
  frontLat: string;
  frontLon: string;
  noorLat: string;
  noorLon: string;
  upperAddrName: string;
  middleAddrName: string;
  lowerAddrName: string;
  detailAddrName: string;
  mlClass: string;
  firstNo: string;
  secondNo: string;
  roadName: string;
  firstBuildNo: string;
  secondBuildNo: string;
  radius: string;
  bizName: string;
  upperBizName: string;
  middleBizName: string;
  lowerBizName: string;
  detailBizName: string;
  rpFlag: string;
  parkFlag: string;
  detailInfoFlag: string;
  desc: string;
  dataKind: string;
  zipCode: string;
  adminDongCode: string;
  legalDongCode: string;
  newAddressList: NewAddressList;
  evChargers: [];
};
export type Pois = {
  poi: Poi[];
};

export type SearchPoiInfo = {
  totalCount: string;
  count: string;
  page: string;
  pois: Pois;
};

export type TMap = {
  getCenter: () => TMapLatLng;
  setCenter: (latLng: TMapLatLng) => void;
  setZoomLimit: (minZoom: number, maxZoom: number) => void;
  setZoom: (zoomLevel: number) => void;
  setOptions: ({ zoomControl }: MapOptions) => void;
  destroy: () => void;
  addListener: (
    eventType: EventType,
    listener: (event: TMapEvent) => void,
  ) => void;
};
type EventType = "click";

export type TMapEvent = {
  latLng: TMapLatLng;
};
export type TMapLatLng = {
  name: string;
  _lat: number;
  _lng: number;
};

export type TMapMarker = {
  setMap: (map: TMap | null) => void;
  getPosition: () => TMapLatLng;
  setPosition: (latLng: TMapLatLng) => void;
  setLabel: (HTML: string) => void;
  addListener: (e: EventType, listener: (event: TMapEvent) => void) => void;
};
export type TMapSize = {
  _width: number;
  _height: number;
};
export type TmapAddressInfo = {
  fullAddress: string;
};
export type TmapResponse = {
  searchPoiInfo: SearchPoiInfo;
};
export type TmapReverseGeocodingResponse = {
  addressInfo: TmapAddressInfo;
};
