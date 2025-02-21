import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/utils/dropdownMenu";
import {
  DeleteIcon,
  EditIcon,
  MeatballEditIcon,
  MeatballsIcon,
  ReportIcon,
  ShareIcon,
  TrashcanIcon,
} from "../utils/icons";

export default function MeatballMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MeatballsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex cursor-pointer items-center">
          <MeatballEditIcon />
          <p className="text-gray-500? text-xs">수정하기</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center">
          <DeleteIcon />
          <p className="text-gray-500? text-xs">삭제하기</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center">
          <ReportIcon />
          <p className="text-gray-500? text-xs">신고하기</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center">
          <ShareIcon />
          <p className="text-gray-500? text-xs">공유하기</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
