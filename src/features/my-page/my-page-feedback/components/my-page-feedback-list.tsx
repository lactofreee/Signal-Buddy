import { IFeedbackListItem } from "@/src/types/feedback/feedbackList";
import FeedbackItem from "@/src/features/my-page/my-page-feedback/components/my-page-feedback-item";

export default function LikedFeedbackList({
  feedbackList,
}: {
  feedbackList: IFeedbackListItem[];
}) {
  return (
    <>
      {feedbackList.map((feedbackListItem, index) => (
        <FeedbackItem key={index} {...feedbackListItem} />
      ))}
    </>
  );
}
