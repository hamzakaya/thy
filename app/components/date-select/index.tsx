import Image from "next/image";
import { useCallback, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";

export default function DateSelect() {
  const [value, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = useCallback((newValue: DateValueType) => {
    setValue(newValue);
  }, []);

  return (
    <Datepicker
      value={value}
      onChange={handleValueChange}
      i18n="tr-TR"
      showFooter={true}
      showShortcuts={false}
      useRange={false}
      asSingle={true}
      toggleIcon={DatePickerIcon}
      classNames={{
        input: () =>
          "relative transition-all duration-300 h-14 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 tracking-wide font-light text-sm placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed",
      }}
    />
  );
}

function DatePickerIcon() {
  return (
    <Image
      src={`/calendar.svg`}
      alt={"calendar"}
      width={30}
      height={30}
      priority
      style={{
        filter: "invert(0.5) saturate(5) hue-rotate(175deg)",
        opacity: 0.7,
      }}
    />
  );
}
