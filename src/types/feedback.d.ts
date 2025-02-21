export interface IFeedbackCommentProps {
  uid: string;
  content: string;
  username: string;
  user_profile: string;
  created_at: Date;
  is_admin: boolean;
}

export interface FeedbackCommentListProps {
  comments: IFeedbackCommentProps[];
}