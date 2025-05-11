"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Bookmark } from "@/src/types/my-place";
import { useState } from "react";
import { useMyPlaceNameChange } from "@/src/hooks/use-my-place-edit-rename";

interface MyPlaceNameChangeDialogProps {
  children: React.ReactNode;
  currentName?: string;
  bookmark: Bookmark;
  onSubmit?: (newName: string) => void;
}

export function MyPlaceNameChangeDialog({
  children,
  bookmark,
}: MyPlaceNameChangeDialogProps) {
  const [open, setOpen] = useState(false);

  const { setNewName, handleSave } = useMyPlaceNameChange(bookmark, () => {
    setOpen(false);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="text-center text-3xl">
            장소명 변경
          </DialogTitle>
          <DialogDescription className="text-center">
            <span className="text-bold">{bookmark.name}</span>의 새로운 장소명을
            입력해 주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="items-center space-y-2">
            <Label htmlFor="new-name" className="text-right hidden">
              새로운 장소명
            </Label>
            <Input
              id="new-name"
              placeholder="새로운 장소명"
              onChange={(e) => setNewName(e.target.value)}
              className="col-span-3 theme-content-bg"
              required
            />
          </div>
        </div>
        <DialogFooter className="flex justify-center">
          <Button type="submit" onClick={handleSave} className="w-full bg-teal">
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
