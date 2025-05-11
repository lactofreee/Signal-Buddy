import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import Image from "next/image";
import deleteImage from "@/public/imgs/Delete.svg";
import twoLineHamburger from "@/public/imgs/two-line-hamburger.svg";
import { MyPlaceNameChangeDialog } from "@/src/features/my-place/my-place-edit/components/my-place-edit-modal";

interface Bookmark {
  bookmarkId: number;
  lat: number;
  lng: number;
  address: string;
  name: string;
  sequence: number;
}

interface MyPlaceItemProps {
  bookmark: Bookmark;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  onDelete: () => void;
}

export function MyPlaceEditItem({
  bookmark,
  dragHandleProps,
  onDelete,
}: MyPlaceItemProps) {
  const { bookmarkId, name, address } = bookmark;

  return (
    <article>
      <div className="flex items-center gap-2 md:p-5 md:theme-content-bg md:rounded-lg md:h-[80px] w-full justify-between">
        <div className="flex flex-1">
          <div
            className="flex items-center pr-2 md:pr-[18px]"
            onClick={onDelete}
          >
            <Image src={deleteImage} alt="삭제" />
          </div>
          <MyPlaceNameChangeDialog bookmark={bookmark}>
            <div className="theme-content-bg rounded-full px-5 md:px-0 py-2 h-[58px] flex-1">
              <p className="text-base font-extrabold h-5 overflow-hidden">
                {name}
              </p>
              <p className="text-sm font-medium theme-my-profile-location-address h-4 mt-1 overflow-hidden">
                {address}
              </p>
            </div>
          </MyPlaceNameChangeDialog>
        </div>
        <div className="flex items-center">
          <div className="ml-2 md:ml-5" {...(dragHandleProps || {})}>
            <Image
              src={twoLineHamburger}
              alt="순서 바꾸기 아이콘"
              className="dark:invert"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
