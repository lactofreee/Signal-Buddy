import FeedbackCommentList from "@/src/components/feedback/FeedbackCommentList";

// feedbackList
interface Member {
  memberId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  role: "USER" | "ADMIN";
  memberStatus: "ACTIVITY" | "WITHDRAWAL";
}

interface Crossroad {
  crossroadId: number;
  name: string;
  lat: number;
  lng: number;
  status: "TRUE" | "FALSE";
}

interface IFeedbackListItem {
  feedbackId: number;
  subject: string;
  content: string;
  category: string;
  likeCount: number;
  secret: boolean;
  answerStatus: "BEFORE" | "COMPLETION";
  createdAt: string;
  updatedAt: string;
  member: Member;
  crossroad: Crossroad;
}

// feedbackDetails
interface IFeedbackDetailResponse {
  status: "성공" | "실패"; // 응답 상태
  message: string | null;
  data: IFeedbackListItem;
}

//feedbackCommentList

interface IFeedbackCommentListProps {
  id: string;
  userId?: string;
}

interface IFeedbackCommentListResponse {
  status: string;
  message: string | null;
  data: SearchResult;
}

interface SearchResult {
  totalElements: number;
  totalPages: number;
  currentPageNumber: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
  searchResults: Comment[];
}

interface IFeedbackCommentProps {
  feedbackId: string;
  commentItem: Comment;
  userId?: string;
  comments: Comment[];
  setComments: Dispatch<SetStateAction<Comment[]>>;
}

interface Comment {
  commentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  member: Member;
}

interface User {
  id: string;
  memberId: number;
  nickname: string;
  profileImageUrl?: string;
  email: string;
  role: "USER" | "ADMIN";
  token: string;
  refreshToken: string;
}

// ✅ `User`가 `undefined`일 수 있도록 타입 정의
type UserType = User | undefined;
