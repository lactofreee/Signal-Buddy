"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import client from "@/src/lib/api/client";
import { Bookmark } from "@/src/types/my-place";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface MyPlaceNameChangeDialogProps {
  children: React.ReactNode;
  currentName?: string;
  bookmark: Bookmark;
  onSubmit?: (newName: string) => void;
}

interface RenameBody {
  lng: number;
  lat: number;
  address: string;
  name: string;
}

function newPlaceNameSchema(currentName: string) {
  return z.object({
    placeName: z
      .string()
      .min(1, { message: "새로운 장소명을 입력해주세요." })
      .max(20, { message: "20자 이내로 입력해주세요" })
      .refine((value) => value !== currentName, {
        message: "새로운 장소명을 입력해주세요.",
      }),
  });
}

export function MyPlaceNameChangeDialog({
  children,
  bookmark,
}: MyPlaceNameChangeDialogProps) {
  const { data: session, status } = useSession();
  const { bookmarkId, lng, lat, address, name } = bookmark;
  const [newName, setNewName] = useState<string>("");
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const renameMutation = useMutation({
    mutationFn: async (newName: string) => {
      if (!session?.user?.memberId) return;
      const body = {
        lng: lng,
        lat: lat,
        address: address,
        name: newName,
      };
      const response = await client.patch(
        `/api/members/${session.user.memberId}/bookmarks/${bookmarkId}`,
        body,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myPlaces", session?.user?.memberId],
      });
      setOpen(false);
    },
  });

  const schema = newPlaceNameSchema(name);

  const handleSave = () => {
    const result = schema.safeParse({ placeName: newName });
    if (!result.success) {
      const errorMsg =
        result.error.issues[0]?.message || "유효하지 않은 입력입니다.";
      toast.error(errorMsg);
      return;
    }
    renameMutation.mutate(newName);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="text-center text-3xl">
            장소명 변경
          </DialogTitle>
          <DialogDescription className="text-center">
            <span className="text-bold">{name}</span>의 새로운 장소명을 입력해
            주세요.
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
