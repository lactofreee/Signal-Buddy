import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

// 더미 데이터 추가
const users = [
  {
    id: "001",
    nickname: "Jade",
    email: "dreamerA@example.com",
    provider: "Google",
    role: "일반",
    status: "활성",
    joinedAt: "2024-01-10",
    note: "-",
  },
  {
    id: "002",
    nickname: "Tim",
    email: "dreamerB@example.com",
    provider: "Kakao",
    role: "관리자",
    status: "비활성",
    joinedAt: "2024-02-14",
    note: "테스트 계정",
  },
  {
    id: "003",
    nickname: "Sally",
    email: "dreamerC@example.com",
    provider: "Facebook",
    role: "일반",
    status: "활성",
    joinedAt: "2024-02-20",
    note: "-",
  },
];

export default function UserTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">번호</TableHead>
          <TableHead>닉네임</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>oAuth 제공자</TableHead>
          <TableHead>등급</TableHead>
          <TableHead>유저 상태</TableHead>
          <TableHead>가입일</TableHead>
          <TableHead>비고</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.nickname}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.provider}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>{user.joinedAt}</TableCell>
            <TableCell>{user.note}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
