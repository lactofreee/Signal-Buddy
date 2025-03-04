import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 더미 데이터 추가
const inquiryData = [
  {
    id: "INQ001",
    title: "욕설 및 비방 신고",
    content: "게시글에서 심한 욕설이 포함되어 있습니다.",
    reporter: "김철수",
    processedAt: "2024-02-21",
    status: "처리 완료",
  },
  {
    id: "INQ002",
    title: "허위 사실 유포",
    content: "사실과 다른 내용을 게시하고 있어 신고합니다.",
    reporter: "이영희",
    processedAt: "-",
    status: "미처리",
  },
  {
    id: "INQ003",
    title: "스팸 광고 게시물",
    content: "반복적인 광고성 게시물이 작성되었습니다.",
    reporter: "박민수",
    processedAt: "2024-02-18",
    status: "처리 완료",
  },
  {
    id: "INQ004",
    title: "개인정보 유출 의심",
    content: "게시글에 개인 전화번호가 포함되어 있습니다.",
    reporter: "최지은",
    processedAt: "2024-02-17",
    status: "처리 완료",
  },
  {
    id: "INQ005",
    title: "음란물 게시",
    content: "부적절한 사진이 포함된 게시글입니다.",
    reporter: "홍길동",
    processedAt: "-",
    status: "미처리",
  },
];

export default function SupportTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">번호</TableHead>
          <TableHead>문의 제목</TableHead>
          <TableHead>신고 내용</TableHead>
          <TableHead>신고자</TableHead>
          <TableHead>처리일</TableHead>
          <TableHead>처리 여부</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inquiryData.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium">{data.id}</TableCell>
            <TableCell>{data.title}</TableCell>
            <TableCell>{data.content}</TableCell>
            <TableCell>{data.reporter}</TableCell>
            <TableCell>{data.processedAt}</TableCell>
            <TableCell>{data.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
