import { CrossRoadSearchbar } from "@/src/components/feedback/ui/CrossRoadSearchbar";
import DropDownMenu from "@/src/components/feedback/ui/DropDownMenu";
import { ArrowLeftIcon, CheckIcon } from "@/src/components/utils/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, use, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { auth } from "@/src/auth";
import { IFeedbackDetailResponse } from "@/src/types/feedback/feedbackList";
import { fetchDataFeedbackItem } from "@/src/app/api/feedback/fetchFeedbackItem";
import FeedbackEditPost from "@/src/components/feedback/FeedbackEditPost";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const TOKEN = session?.user.token;
  const userId = session?.user.memberId || null;

  let res: IFeedbackDetailResponse | null = null;

  if (TOKEN) {
    res = await fetchDataFeedbackItem(id, TOKEN);
  }

  const feedbackData = res?.data;
  console.log(feedbackData);

  return (
    <div>
      {feedbackData && (
        <div>
          <FeedbackEditPost feedbackData={feedbackData} token={TOKEN!} />
        </div>
      )}
    </div>
  );
}
