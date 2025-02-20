import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/utils/dropdownMenu";
import {
  EditIcon,
  MeatballsIcon,
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
        <DropdownMenuItem className="flex items-center">
          <EditIcon />
          수정
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <ShareIcon />
          공유
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <TrashcanIcon />
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
