export function getPm10Status(pm10: number): string {
  if (pm10 <= 30) return "좋음";
  if (pm10 <= 80) return "보통";
  if (pm10 <= 150) return "나쁨";
  return "매우 나쁨";
}

export function getPm25Status(pm25: number): string {
  if (pm25 <= 15) return "좋음";
  if (pm25 <= 50) return "보통";
  if (pm25 <= 100) return "나쁨";
  return "매우 나쁨";
}
