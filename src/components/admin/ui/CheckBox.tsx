"use client"

import { Checkbox } from "@/components/ui/checkbox"

interface CheckboxProps {
  id: string
  label: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export function CustomCheckbox({ id, label, checked, onChange, className }: CheckboxProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}
