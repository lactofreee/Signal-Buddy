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
      {/* 모바일 화면 */}
      <div className="flex items-center gap-2 md:hidden">
        <div onClick={onDelete}>
          <Image src={deleteImage} alt="삭제" />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-full px-5 py-2 h-[58px] flex-1">
          <p className="text-base font-extrabold h-5 overflow-hidden">{name}</p>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 h-4 mt-1 overflow-hidden">
            {address}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 w-[58px] h-[58px] rounded-full flex items-center justify-center">
          <div className="bg-gray-500 w-[50px] h-[50px] rounded-full"></div>
        </div>
        <div className="ml-1 " {...(dragHandleProps || {})}>
          <Image
            src={twoLineHamburger}
            alt="순서 바꾸기 아이콘"
            className="dark:invert"
          />
        </div>
      </div>

      {/* pc 화면 */}
      <div className="hidden md:flex items-center gap-2 p-5 bg-white dark:bg-gray-800 rounded-lg h-[80px] w-full justify-between">
        <div className="flex">
          <div className="flex items-center pr-4" onClick={onDelete}>
            <Image src={deleteImage} alt="삭제" />
          </div>
          <div>
            <p className="text-base font-extrabold">{name}</p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {address}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-white dark:bg-gray-800 w-[58px] h-[58px] rounded-xl border border-gray-300 flex items-center justify-center">
            <div className="bg-gray-500 w-[50px] h-[50px] rounded-lg"></div>
          </div>
          <div className="ml-5" {...(dragHandleProps || {})}>
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
