import Toolbar from "@/src/components/admin/ui/users/Toolbar";
import UserTable from "@/src/components/admin/ui/users/UserTable";

export default function page() {
  return (
    <div>
      <Toolbar />
      <div className="mt-[30px] flex flex-col gap-[18px]">
        <p className="font-semibold text-xs text-gray-500">전체 999</p>
        <div>
          <UserTable />
        </div>
      </div>
    </div>
  );
}
