export const getUserLocation = async (): Promise<{
  latitude: number;
  longitude: number;
} | null> => {
  if (!navigator.geolocation) {
    console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
    return null;
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({ latitude, longitude });
      },
      (error) => {
        console.error("위치 정보를 가져오는 데 실패했습니다:", error);
        reject(error);
      },
    );
  });
};