import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../shadcn/components/ui/pagination";

export default function FeedbackPagination({
  totalPages,
  page,
  size,
}: {
  totalPages: number;
  page: number;
  size: number;
}) {
  return (
    <Pagination>
      <PaginationContent>
        {/* 이전 페이지 버튼 */}
        <PaginationItem>
          <PaginationPrevious href={`?page=${Math.max(page - 1, 0)}`} />
        </PaginationItem>

        {/* 페이지 번호 버튼 */}
        {[...Array(totalPages)].map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <PaginationItem key={idx}>
              <PaginationLink
                href={`?page=${pageNumber - 1}`}
                isActive={page+1 === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* 다음 페이지 버튼 */}
        <PaginationItem>
          <PaginationNext href={`?page=${Math.min(page + 1, totalPages-1)}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
