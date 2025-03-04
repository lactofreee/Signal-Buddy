import React from "react";
import { CustomCheckbox } from "@/src/components/admin/ui/CheckBox";

export default function CustomCheckboxGroup({
  label,
  options,
}: {
  label: string;
  options: { id: string; label: string }[];
}) {
  return (
    <div className="flex gap-20 h-10 items-center">
      <label className="text-xs font-semibold text-gray-700">{label}</label>
      <div className="flex gap-6 text-sm font-medium text-gray-500">
        {options.map((option) => (
          <CustomCheckbox key={option.id} id={option.id} label={option.label} />
        ))}
      </div>
    </div>
  );
}
