import { useMemo } from "react";
import FlightSorter from "../common/utils/flight-sorter";
import { SortType } from "../common/models";

export default function useFlightSorter(
  flightData: FlightData[],
  sortType: SortType
) {
  return useMemo(() => {
    const flightSorter = new FlightSorter(flightData);

    switch (sortType) {
      case SortType.DateTime:
        return flightSorter.sortByDateTime();

      case SortType.Price:
        return flightSorter.sortByPrice();

      default:
        return flightData;
    }
  }, [flightData, sortType]);
}
