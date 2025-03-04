import { create } from "zustand";
import { IFeedbackData } from "@/src/types/feedback/feedbackList";

interface FeedbackStore {
  feedbackListData: IFeedbackData[];
  addFeedback: (feedback: IFeedbackData) => void;
  setFeedbackList: (feedbackList: IFeedbackData[]) => void;
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  feedbackListData: [
    {
      uid: 1,
      status: "답변 후",
      title: "피드백 제목 1",
      content: "피드백 내용 1",
      nickname: "닉네임 1",
      date: "2025.02.20",
    },
    {
      uid: 2,
      status: "답변 후",
      title: "피드백 제목 2",
      content: "피드백 내용 2",
      nickname: "닉네임 2",
      date: "2025.02.20",
    },
    {
      uid: 3,
      status: "답변 전",
      title: "피드백 제목 3",
      content: "피드백 내용 3",
      nickname: "닉네임 3",
      date: "2025.02.20",
    },
    {
      uid: 4,
      status: "답변 전",
      title: "피드백 제목 4",
      content: "피드백 내용 4",
      nickname: "닉네임 4",
      date: "2025.02.20",
    },
  ],
  addFeedback: (feedback) =>
    set((state) => ({
      feedbackListData: [...state.feedbackListData, feedback],
    })),
  setFeedbackList: (feedbackList) => set({ feedbackListData: feedbackList }),
}));
