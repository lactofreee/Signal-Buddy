"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function FeedbackPagination({
  totalPages,
  page,
  size,
}: {
  totalPages: number;
  page: number;
  size: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* 이전 페이지 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goToPage(Math.max(page - 1, 0))}
            className={`${page === 0 ? "pointer-events-none opacity-50" : ""} cursor-pointer`}
          />
        </PaginationItem>

        {/* 페이지 번호 버튼 */}
        {[...Array(totalPages)].map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <PaginationItem key={idx}>
              <PaginationLink
                onClick={() => goToPage(pageNumber - 1)}
                isActive={page + 1 === pageNumber}
                className="cursor-pointer"
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
          <PaginationNext
            onClick={() => goToPage(Math.min(page + 1, totalPages - 1))}
            className={`${page === totalPages - 1 ? "pointer-events-none opacity-50" : ""} cursor-pointer`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
