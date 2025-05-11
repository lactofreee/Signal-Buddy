import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function FeedbackSearchInput({
  params,
  searchTerm,
  setSearchTerm,
  pathname,
  replace,
}: {
  params: URLSearchParams;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  pathname: string;
  replace: (href: string, options?: NavigateOptions) => void;
}) {
  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  // 검색 실행 함수
  const handleSearch = (term: string) => {
    if (term.trim()) {
      params.set("keyword", term.trim());
    } else {
      params.delete("keyword");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-1">
      <input
        type="text"
        className="border-1 h-10 w-[264px] rounded-[8px] border theme-line theme-content-bg p-3 text-sm font-medium text-gray-500"
        placeholder="검색어를 입력해주세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="h-10 w-[70px] rounded-[8px] theme-feedback-filter-search-button text-sm font-medium text-white"
      >
        검색
      </button>
    </form>
  );
}
