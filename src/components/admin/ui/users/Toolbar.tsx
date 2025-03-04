import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/src/components/admin/ui/DatePicker";
import { Button } from "@/components/ui/button";
import CustomCheckboxGroup from "../CustomCheckboxGroup";

export default function Toolbar() {
  return (
    <div className="rounded-[12px] h-auto bg-white w-full p-3 flex flex-col gap-4">
      <div className="flex gap-20">
        {/* 왼쪽 필터 */}
        <div className="w-full flex flex-col gap-4">
          {/* 검색어 */}
          <div className="flex gap-[72px] h-10 items-center">
            <label
              htmlFor="search"
              className="text-xs font-semibold text-gray-700"
            >
              검색어
            </label>
            <div className="flex gap-1 text-sm font-medium text-gray-500">
              <Select>
                <SelectTrigger className="w-[117px] h-10">
                  <SelectValue placeholder="검색조건" />
                </SelectTrigger>
                <SelectContent>
                  {["이름", "이메일", "닉네임"].map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input id="search" placeholder="검색어를 입력해주세요." />
            </div>
          </div>

          {/* 회원 유형 */}
          <CustomCheckboxGroup
            label="회원 유형"
            options={[
              { id: "user-category-all", label: "전체" },
              { id: "user-category-email", label: "일반회원" },
              { id: "user-category-naver", label: "네이버" },
              { id: "user-category-kakao", label: "카카오" },
              { id: "user-category-google", label: "구글" },
            ]}
          />

          {/* 회원 등급 */}
          <CustomCheckboxGroup
            label="회원 등급"
            options={[
              { id: "user-rank-all", label: "전체" },
              { id: "user-rank-email", label: "일반회원" },
              { id: "user-rank-admin", label: "관리자" },
            ]}
          />
        </div>

        {/* 오른쪽 필터 */}
        <div className="w-full flex flex-col gap-4">
          {/* 가입일 */}
          <div className="flex gap-[72px] h-10 items-center">
            <label
              htmlFor="join-date"
              className="text-xs font-semibold text-gray-700"
            >
              가입일
            </label>
            <div className="flex gap-1 text-sm font-medium text-gray-500">
              <DatePicker id="join-date" />
            </div>
          </div>

          {/* 회원 상태 */}
          <CustomCheckboxGroup
            label="회원 상태"
            options={[
              { id: "user-status-all", label: "전체" },
              { id: "user-status-active", label: "정상" },
              { id: "user-status-deleted", label: "탈퇴" },
            ]}
          />
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex w-full justify-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-gray-800 text-white font-medium text-sm rounded-[8px]"
            aria-label="검색"
          >
            검색
          </Button>
          <Button
            variant="outline"
            className="bg-gray-400 text-white font-medium text-sm rounded-[8px]"
            aria-label="초기화"
          >
            초기화
          </Button>
        </div>
      </div>
    </div>
  );
}
