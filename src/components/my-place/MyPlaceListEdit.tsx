"use client";

import Image from "next/image";
import deleteImage from "@/public/imgs/Delete.svg";
import twoLineHamburger from "@/public/imgs/two-line-hamburger.svg";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvidedDragHandleProps,
} from "@hello-pangea/dnd";

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

function MyPlaceItem({
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
          <div className="theme-content-bg rounded-full px-5 md:px-0 py-2 h-[58px] flex-1">
            <p className="text-base font-extrabold h-5 overflow-hidden">
              {name}
            </p>
            <p className="text-sm font-medium theme-my-profile-location-address h-4 mt-1 overflow-hidden">
              {address}
            </p>
          </div>
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

interface MyPlaceListEditProps {
  items: Bookmark[];
  handleDragEnd: (result: DropResult) => void;
  handleDelete: (bookmarkId: number) => void;
}

export default function MyPlaceListEdit({
  items,
  handleDragEnd,
  handleDelete,
}: MyPlaceListEditProps) {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="myPlaceList">
        {(provided) => (
          <div
            className="flex flex-col"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((bookmark, index) => (
              <Draggable
                key={bookmark.bookmarkId.toString()}
                draggableId={bookmark.bookmarkId.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="mb-2"
                  >
                    <MyPlaceItem
                      bookmark={bookmark}
                      dragHandleProps={provided.dragHandleProps}
                      onDelete={() => handleDelete(bookmark.bookmarkId)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {/* 드롭 영역 자리 표시 */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
