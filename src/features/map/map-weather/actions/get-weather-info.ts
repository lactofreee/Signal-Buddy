export const getWeatherInfo = (lat: number, lng: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/sse/weather?lat=${lat}&lng=${lng}`;
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    // 기본 이벤트 처리
    const data = JSON.parse(event.data);
    console.log(data, "기본 메시지");
  };

  eventSource.addEventListener("WEATHER_UPDATE", (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    console.log(data, "날씨 업데이트");
    // TODO: 여기서 상태 저장 or 콜백 호출
  });

  eventSource.onerror = (err) => {
    console.error("SSE 연결 오류", err);
    eventSource.close();
  };

  return eventSource; // 필요 시 컴포넌트에서 해제용으로 리턴
};
