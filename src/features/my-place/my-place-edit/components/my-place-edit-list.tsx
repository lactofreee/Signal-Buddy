"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Bookmark } from "@/src/types/my-place";
import { MyPlaceEditItem } from "@/src/features/my-place/my-place-edit/components/my-place-edit-item";

interface MyPlaceListEditProps {
  items: Bookmark[];
  handleDragEnd: (result: DropResult) => void;
  handleDelete: (bookmarkId: number) => void;
}

export default function MyPlaceEditList({
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
                    <MyPlaceEditItem
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
