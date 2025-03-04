export const DEFAULT_ZOOM_LEVEL = 16;
export const INITIAL_LATITUDE = 37.566481622437934;
export const INITIAL_LONGITUDE = 126.98502302169841;
export const MAX_ZOOM_LEVEL = 17;
export const MIN_ZOOM_LEVEL = 7;

export const TMAP_TURN_TYPE = {
  11: { value: "직진", icon: "/imgs/nav-straight.svg" },
  12: { value: "좌회전", icon: "/imgs/nav-left.svg" },
  13: { value: "우회전", icon: "/imgs/nav-right.svg" },
  14: { value: "유턴", icon: "/imgs/nav-u-turn.svg" },
  16: { value: "8시 방향 좌회전", icon: "/imgs/nav-left.svg" },
  17: { value: "10시 방향 좌회전", icon: "/imgs/nav-left.svg" },
  18: { value: "2시 방향 우회전", icon: "/imgs/nav-right.svg" },
  19: { value: "4시 방향 우회전", icon: "/imgs/nav-right.svg" },
  184: { value: "경유지" },
  185: { value: "첫번째 경유지" },
  186: { value: "두번째 경유지" },
  187: { value: "세번째 경유지" },
  188: { value: "네번째 경유지" },
  189: { value: "다섯번째 경유지" },
  125: { value: "육교" },
  126: { value: "지하보도" },
  127: { value: "계단 진입" },
  128: { value: "경사로 진입" },
  129: { value: "계단+경사로 진입" },
  200: { value: "출발지", icon: "/imgs/start-marker.png" },
  201: { value: "목적지", icon: "/imgs/end-marker.png" },
  211: { value: "횡단보도" },
  212: { value: "좌측 횡단보도" },
  213: { value: "우측 횡단보도" },
  214: { value: "8시 방향 횡단보도" },
  215: { value: "10시 방향 횡단보도" },
  216: { value: "2시 방향 횡단보도" },
  217: { value: "4시 방향 횡단보도" },
  218: { value: "엘리베이터" },
  233: { value: "직진 임시" },
} as { [key: number]: { value: string; icon?: string } };

export const TMAP_FACILITY_TYPE = {
  1: "교량",
  2: "터널",
  3: "고가도로",
  11: "일반보행자도로",
  12: "육교",
  14: "지하보도",
  15: "횡단보도",
  16: "대형시설물이동통로",
  17: "계단",
} as { [key: string]: string };
export const TMAP_POINT_TYPE = {
  SP: "출발지",
  EP: "도착지",
  PP: "경유지",
  PP1: "경유지1",
  PP2: "경유지2",
  PP3: "경유지3",
  PP4: "경유지4",
  PP5: "경유지5",
  GP: "일반 안내점",
};
