export const fetchFeedbackList = async (
  searchParams?: Promise<Record<string, string | undefined>>,
) => {
  const params = await searchParams;
  const query = new URLSearchParams(
    params as Record<string, string>,
  ).toString();
  const res = await fetch(
    `${process.env.API_BASE_URL}/api/feedbacks?${decodeURI(query)}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
  return res.json();
};

export const fetchTotalFeedback = async () => {
  const res = await fetch(`${process.env.API_BASE_URL}/api/feedbacks?`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("데이터를 가져오는 데 실패했습니다.");
  return res.json();
};
