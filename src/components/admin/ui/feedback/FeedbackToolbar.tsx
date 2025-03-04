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

export default function FeedbackToolbar() {
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

          {/* 피드백 유형 */}
          <CustomCheckboxGroup
            label="피드백 유형"
            options={[
              { id: "feedback-category-all", label: "전체" },
              { id: "feedback-category-1", label: "유형1" },
              { id: "feedback-category-2", label: "유형2" },
              { id: "feedback-category-3", label: "유형3" },
              { id: "feedback-category-4", label: "유형4" },
            ]}
          />
        </div>

        {/* 오른쪽 필터 */}
        <div className="w-full flex flex-col gap-4">
          {/* 작성일 */}
          <div className="flex gap-[72px] h-10 items-center">
            <label
              htmlFor="createdAt"
              className="text-xs font-semibold text-gray-700"
            >
              작성일
            </label>
            <div className="flex gap-1 text-sm font-medium text-gray-500">
              <DatePicker id="createdAt" />
            </div>
          </div>

          {/* 답변 여부 */}
          <CustomCheckboxGroup
            label="답변 여부"
            options={[
              { id: "answer-status-all", label: "전체" },
              { id: "answer-status-true", label: "답변" },
              { id: "answer-status-false", label: "미답변" },
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
