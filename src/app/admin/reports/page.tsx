import ReportsTable from "@/src/components/admin/ui/reports/ReportsTable";
import ReportsToolbar from "@/src/components/admin/ui/reports/ReportsToolbar";

export default function Page() {
  return (
    <div>
      <ReportsToolbar />
      <div className="mt-[30px] flex flex-col gap-[18px]">
        <p className="font-semibold text-xs text-gray-500">전체 999</p>
        <div>
          <ReportsTable />
        </div>
      </div>
    </div>
  );
}
