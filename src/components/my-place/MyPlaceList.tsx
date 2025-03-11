import MyPlaceItem from "./MyPlaceItem";
import { Bookmark } from "@/src/types/my-place";
import MyPlacePagination from "./MyPlacePagination";

interface MyPlaceListProps {
  searchResults: Bookmark[];
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function MyPlaceList({
  searchResults,
  page,
  totalPages,
  onPageChange,
}: MyPlaceListProps) {
  return (
    <div className="flex-1 flex flex-col space-y-2">
      {searchResults.length > 0 ? (
        <>
          {searchResults.map((item) => (
            <MyPlaceItem
              key={item.bookmarkId}
              name={item.name}
              address={item.address}
              lat={item.lat}
              lng={item.lng}
            />
          ))}
          <MyPlacePagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className="flex justify-center my-[100px]">
          <p className="theme-feedback-no-result text-sm">
            즐겨찾기를 추가해 주세요.
          </p>
        </div>
      )}
    </div>
  );
}
