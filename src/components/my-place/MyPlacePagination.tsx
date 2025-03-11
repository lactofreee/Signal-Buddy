"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface MyPlacePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function MyPlacePagination({
  page,
  totalPages,
  onPageChange,
}: MyPlacePaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(page - 1, 0))}
            aria-disabled={page === 0}
          />
        </PaginationItem>

        {page > 0 && (
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(page - 1)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive onClick={() => {}}>
            {page + 1}
          </PaginationLink>
        </PaginationItem>

        {page + 1 < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => onPageChange(page + 1)}>
              {page + 2}
            </PaginationLink>
          </PaginationItem>
        )}

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
