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

export type PoiDetail = Poi & {
  address?: string;
  firstNo?: string;
  secondNo?: string;
  bldAddr?: string;
  bldNo1?: string;
  bldNo2?: string;
  homepageURL?: string;
  tel?: string;
  additionalInfo?: string;
};

// Geometry 타입 정의 (Point 또는 LineString)
interface Geometry {
  type: "Point" | "LineString";
  coordinates: number[] | number[][];
}

// LineString 타입의 Geometry를 명확하게 정의
export interface LineStringGeometry extends Geometry {
  type: "LineString";
  coordinates: number[][];
}

// Point 타입의 Geometry를 명확하게 정의
export interface PointGeometry extends Geometry {
  type: "Point";
  coordinates: number[];
}

// 공통 properties 타입 정의
interface BaseProperties {
  index: number;
  facilityType: string;
  facilityName: string;
}

// Point 데이터의 Properties 타입 정의
interface PointProperties extends BaseProperties {
  pointIndex: number;
  name: string;
  description: string;
  direction: string;
  nearPoiName: string;
  nearPoiX: string;
  nearPoiY: string;
  intersectionName: string;
  turnType: number;
  pointType: "SP" | "PP" | "EP"; // 출발(SP), 경유(PP), 도착(EP)
  totalTime?: number;
  totalDistance?: number;
}

// LineString 데이터의 Properties 타입 정의
interface LineStringProperties extends BaseProperties {
  lineIndex: number;
  name: string;
  description: string;
  distance: number;
  time: number;
  roadType: number;
  categoryRoadType: number;
}

// Point Feature 타입 정의
export interface PointFeature {
  type: "Feature";
  geometry: PointGeometry;
  properties: PointProperties;
}

// LineString Feature 타입 정의
export interface LineStringFeature {
  type: "Feature";
  geometry: LineStringGeometry;
  properties: LineStringProperties;
}

export type RouteFeature = PointFeature | LineStringFeature;

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
  setMapType: (type: number) => void;
  _data: { mapType: 1 | 4 | 5 };
};
type EventType = "click" | "touchend";

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
  animate: (type: number) => void;
  stopAnimation: () => void;
  setIcon: (icon: string) => void;
  _marker_data: TMapMarkerOptions;
};
export type TMapMarkerOptions = {
  id?: string;
  name?: string;
  map: TMap;
  position: TMapLatLng;
  iconHTML?: string;
  iconSize?: TMapSize;
  label?: string;
  icon?: string;
  title?: string;
  animation?: number;
};
export interface TMapPolyline {
  setMap: (map: TMap | null) => void;
}
export type TMapSize = {
  _width: number;
  _height: number;
};
export type TmapAddressInfo = {
  fullAddress: string;
};
export type TmapResponse = {
  searchPoiInfo: SearchPoiInfo;
  features: RouteFeature[];
  poiDetailInfo: PoiDetail;
};
export type TmapReverseGeocodingResponse = {
  addressInfo: TmapAddressInfo;
};
