import { useMemo, Dispatch, SetStateAction } from "react";
import { SortType, sortTypes } from "../common/models";
import SortButton from "../components/sort-buttons";

export default function useSortButtons(
  sortType: SortType,
  setSortType: Dispatch<SetStateAction<SortType>>
) {
  return useMemo(() => {
    return sortTypes.map(({ label, value }) => {
      return (
        <SortButton
          key={value}
          label={label}
          value={value}
          isActive={value === sortType}
          onClick={() => setSortType(value)}
        />
      );
    });
  }, [sortType, setSortType]);
}
