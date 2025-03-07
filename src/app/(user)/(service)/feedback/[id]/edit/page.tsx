import { auth } from "@/src/auth";
import { IFeedbackDetailResponse } from "@/src/types/feedback/feedbackList";
import { fetchDataFeedbackItem } from "@/src/app/api/feedback/fetchFeedbackItem";
import FeedbackEditPost from "@/src/components/feedback/FeedbackEditPost";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const TOKEN = session?.user.token;
  const userId = session?.user.memberId || null;

  let res: IFeedbackDetailResponse | null = null;

  if (TOKEN) {
    res = await fetchDataFeedbackItem(id);
  }

  const feedbackData = res?.data;
  console.log(feedbackData);

  return (
    <div>
      {feedbackData && (
        <div>
          <FeedbackEditPost feedbackData={feedbackData} token={TOKEN!} />
        </div>
      )}
    </div>
  );
}
