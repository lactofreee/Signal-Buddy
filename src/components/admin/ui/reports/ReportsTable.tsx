import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

// 더미 데이터 추가
const reportData = [
  {
    id: "RPT001",
    reportedAt: "2024-02-20",
    content: "부적절한 언어 사용",
    reporter: "김철수",
    processedAt: "2024-02-21",
    status: "처리 완료",
  },
  {
    id: "RPT002",
    reportedAt: "2024-02-18",
    content: "스팸 게시물",
    reporter: "이영희",
    processedAt: "-",
    status: "미처리",
  },
  {
    id: "RPT003",
    reportedAt: "2024-02-17",
    content: "허위 정보 게시",
    reporter: "박민수",
    processedAt: "2024-02-18",
    status: "처리 완료",
  },
  {
    id: "RPT004",
    reportedAt: "2024-02-16",
    content: "광고성 댓글",
    reporter: "최지은",
    processedAt: "2024-02-17",
    status: "처리 완료",
  },
  {
    id: "RPT005",
    reportedAt: "2024-02-15",
    content: "욕설 및 비방",
    reporter: "홍길동",
    processedAt: "-",
    status: "미처리",
  },
];

export default function ReportsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">번호</TableHead>
          <TableHead>신고일</TableHead>
          <TableHead>신고 내용</TableHead>
          <TableHead>신고자</TableHead>
          <TableHead>처리일</TableHead>
          <TableHead>처리 여부</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reportData.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium">{data.id}</TableCell>
            <TableCell>{data.reportedAt}</TableCell>
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
