"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";

interface MyPlacePaginationProps {
  page: number; // 현재 페이지 (0-based)
  totalPages: number; // 전체 페이지 수
  onPageChange: (newPage: number) => void;
}

export default function MyPlacePagination({
  page,
  totalPages,
  onPageChange,
}: MyPlacePaginationProps) {
  const maxVisible = 5;

  let startPage = page - 2;
  let endPage = page + 2;

  if (startPage < 0) {
    endPage += Math.abs(startPage);
    startPage = 0;
  }

  if (endPage > totalPages - 1) {
    endPage = totalPages - 1;
  }

  let visibleCount = endPage - startPage + 1;
  if (visibleCount > maxVisible) {
    const overflow = visibleCount - maxVisible;
    endPage -= overflow;
    visibleCount = maxVisible;
  }

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* 이전 페이지 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(page - 1, 0))}
            aria-disabled={page === 0}
          />
        </PaginationItem>

        {/* 페이지 번호들 (최대 5개) */}
        {pages.map((pg) => (
          <PaginationItem key={pg}>
            <PaginationLink
              onClick={() => onPageChange(pg)}
              isActive={pg === page}
            >
              {pg + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 다음 페이지 버튼 */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              onPageChange(page + 1 < totalPages ? page + 1 : page)
            }
            aria-disabled={page + 1 >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
