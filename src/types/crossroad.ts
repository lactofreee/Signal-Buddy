export type CrossRoadType = {
  crossroadId: number;
  crossroadApiId: string;
  name: string;
  lat: number;
  lng: number;
  status: string;
};

export type CrossRoadSignType = "RED" | "GREEN" | "YELLOW" | null;

export type CrossRoadStatePosition =
  | "north"
  | "south"
  | "east"
  | "west"
  | "northeast"
  | "northwest"
  | "southeast"
  | "southwest";

export type CrossRoadStateType = {
  crossroadId: number;
  crossroadApiId: string;
  transTimestamp: number;
  northTimeLeft: number | null;
  eastTimeLeft: number | null;
  southTimeLeft: number | null;
  westTimeLeft: number | null;
  northeastTimeLeft: number | null;
  northwestTimeLeft: number | null;
  southwestTimeLeft: number | null;
  southeastTimeLeft: number | null;
  northState: CrossRoadSignType;
  eastState: CrossRoadSignType;
  westState: CrossRoadSignType;
  southState: CrossRoadSignType;
  northeastState: CrossRoadSignType;
  northwestState: CrossRoadSignType;
  southeastState: CrossRoadSignType;
  southwestState: CrossRoadSignType;
};
