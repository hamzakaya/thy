import { usePorts } from "@/app/hooks/usePorts";
import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import Select from "react-tailwindcss-select";
import {
  Option,
  Options,
  SelectValue,
} from "react-tailwindcss-select/dist/components/type";

interface IAirportSelectProps {
  label: string;
  onChange?: (code: string) => void;
  icon: "origin" | "destination";
}

export const AirportSelect = ({
  label,
  onChange,
  icon,
}: IAirportSelectProps) => {
  const { data, isLoading } = usePorts();
  const [value, setValue] = useState<SelectValue>(null);

  const items = useMemo<Options>(() => {
    if (isLoading || !data) return [];
    return data.map((i) => ({
      value: i.code,
      label: i.name,
    }));
  }, [data, isLoading]);

  const handleChange = useCallback(
    (e: SelectValue) => {
      const selected = e as Option;

      if (selected) {
        setValue({ ...selected, label: selected.label.slice(0, 20) });
        if (onChange) onChange(selected.value);
      }
    },
    [onChange]
  );

  return (
    <div className="relative">
      <Image
        className="absolute ml-1 mt-2"
        src={`/${icon}.svg`}
        alt={icon}
        width={40}
        height={40}
        priority
        style={{ zIndex: 1, opacity: 0.7 }}
      />

      <Select
        primaryColor="indigo"
        value={value}
        onChange={handleChange}
        options={items}
        placeholder={label}
        searchInputPlaceholder="Havaalanı Ara"
        noOptionsMessage="Havaalanı bulunamadı"
        isSearchable
        loading={isLoading}
        isDisabled={isLoading}
      />
    </div>
  );
};
