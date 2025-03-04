import SupportTable from "@/src/components/admin/ui/support/SupportTable";
import SupportToolbar from "@/src/components/admin/ui/support/SupportToolbar";
import React from "react";

export default function page() {
  return (
    <div>
      <SupportToolbar />
      <div className="mt-[30px] flex flex-col gap-[18px]">
        <p className="font-semibold text-xs text-gray-500">전체 999</p>
        <div>
          <SupportTable />
        </div>
      </div>
    </div>
  );
}
