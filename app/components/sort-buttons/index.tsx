import { SortType } from "@/app/common/models";

interface SortButtonProps {
  label: string;
  value: SortType;
  isActive: boolean;
  onClick: () => void;
}

export default function SortButton({
  label,
  value,
  isActive,
  onClick,
}: SortButtonProps) {
  return (
    <button
      key={value}
      className={`my-0 mr-2 ml-0 text-center normal-case rounded border border-white border-solid cursor-pointer hover:bg-white hover:text-slate-800 px-4 py-1 ${
        isActive && "bg-white text-slate-800"
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
