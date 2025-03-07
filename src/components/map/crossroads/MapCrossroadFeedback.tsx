import { getFeedbackList } from "@/src/services/feedback.service";
import { useQuery } from "@tanstack/react-query";
import FeedbackList from "../../feedback/FeedbackList";

type Props = {
  crossroadId: number;
};

export default function MapCrossroadFeedback({ crossroadId }: Props) {
  const handleGetList = async (crossroadId: number) => {
    try {
      const params = new URLSearchParams();
      params.set("crossroadId", String(crossroadId));
      const res = await getFeedbackList(params);
      const data = res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["feedback", crossroadId],
    queryFn: (q) => handleGetList(q.queryKey[1] as number),
  });

  return (
    <>
      {isLoading ? (
        "로딩"
      ) : error ? (
        "에러"
      ) : data.data.searchResults.length ? (
        <FeedbackList feedbackList={data.data.searchResults} />
      ) : (
        <div className="py-16 text-gray-500">등록된 피드백이 없습니다.</div>
      )}
    </>
  );
}
