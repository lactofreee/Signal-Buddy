import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const feedbackData = [
  {
    id: "FB001",
    category: "유형1",
    title: "버그 발생",
    content: "로그인 시 버튼이 작동하지 않습니다.",
    author: "김철수",
    answered: "답변 완료",
    createdAt: "2024-02-23",
    remarks: "-",
  },
  {
    id: "FB002",
    category: "유형2",
    title: "UI 개선 요청",
    content: "메뉴 배치가 직관적이지 않습니다.",
    author: "이영희",
    answered: "미답변",
    createdAt: "2024-02-22",
    remarks: "-",
  },
  {
    id: "FB003",
    category: "유형3",
    title: "기능 추가 요청",
    content: "다크 모드 기능이 있으면 좋겠습니다.",
    author: "박민수",
    answered: "답변 완료",
    createdAt: "2024-02-21",
    remarks: "-",
  },
  {
    id: "FB004",
    category: "유형4",
    title: "오타 발견",
    content: "회원가입 페이지에 오타가 있습니다.",
    author: "최지은",
    answered: "미답변",
    createdAt: "2024-02-20",
    remarks: "-",
  },
  {
    id: "FB005",
    category: "유형1",
    title: "알림 기능 개선",
    content: "푸시 알림이 제때 오지 않습니다.",
    author: "홍길동",
    answered: "답변 완료",
    createdAt: "2024-02-19",
    remarks: "-",
  },
];

export default function FeedbackTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">번호</TableHead>
          <TableHead>피드백 유형</TableHead>
          <TableHead>제목</TableHead>
          <TableHead>내용</TableHead>
          <TableHead>작성자</TableHead>
          <TableHead>답변 여부</TableHead>
          <TableHead>작성일</TableHead>
          <TableHead>비고</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {feedbackData.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium">{data.id}</TableCell>
            <TableCell>{data.category}</TableCell>
            <TableCell>{data.title}</TableCell>
            <TableCell>{data.content}</TableCell>
            <TableCell>{data.author}</TableCell>
            <TableCell>{data.answered}</TableCell>
            <TableCell>{data.createdAt}</TableCell>
            <TableCell>{data.remarks}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
