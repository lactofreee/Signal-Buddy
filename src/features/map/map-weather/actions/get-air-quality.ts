export const getAirQuality = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/air-quality`,
    );
    if (!res.ok) {
      throw new Error(`미세먼지 조회 실패: ${res.status}`);
    }
    const airQuality = await res.json();
    return airQuality
  } catch (error) {
    console.error("미세먼지 조회 중 오류 발생:", error);
    throw error;
  }
};
