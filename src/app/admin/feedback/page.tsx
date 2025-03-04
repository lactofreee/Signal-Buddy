import FeedbackTable from "@/src/components/admin/ui/feedback/FeedbackTable";
import FeedbackToolbar from "@/src/components/admin/ui/feedback/FeedbackToolbar";

export default function page() {
  return (
    <div>
      <FeedbackToolbar />
      <div className="mt-[30px] flex flex-col gap-[18px]">
        <p className="font-semibold text-xs text-gray-500">전체 999</p>
        <div>
          <FeedbackTable />
        </div>
      </div>
    </div>
  );
}
