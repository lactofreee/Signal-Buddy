"use client";

import { Control } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

type Props = {
  control: Control<any>;
  name: string;
  items: { name: string; value: string | number; link?: string }[];
};
export function CheckboxGroup({ control, name, items }: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          {items.map((item) => (
            <FormField
              key={item.value}
              control={control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.value}
                    className="flex flex-row items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        className="w-[22px] h-[22px] rounded-sm border-gray-300 bg-white"
                        checked={field.value?.includes(item.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.value])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string | number) =>
                                    value !== item.value,
                                ),
                              );
                        }}
                      />
                    </FormControl>
                    {item.link ? (
                      <Link
                        className="text-xs font-bold underline text-gray-500"
                        href={item.link}
                        target="_blank"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <FormLabel className="text-xs font-bold text-gray-500">
                        {item.name}
                      </FormLabel>
                    )}
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
