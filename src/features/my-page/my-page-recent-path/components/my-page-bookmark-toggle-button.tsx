import { StarIcon } from "@/src/components/utils/icons";

interface Props {
  isBookmarked: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export default function BookmarkToggleButton({ isBookmarked, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`hover:cursor-pointer flex h-6 w-6 items-center justify-center rounded-full outline outline-1 hover:theme-hover-recent-path-star-icon ${
        isBookmarked
          ? "theme-bookmarked-recent-path-star-icon"
          : "outline-gray-300 text-gray-300"
      }`}
    >
      <span className="hover:theme-hover-recent-path-star-icon">
        <StarIcon />
      </span>
    </div>
  );
}
