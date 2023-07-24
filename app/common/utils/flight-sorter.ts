import { BrandCode, FareCategories } from "../models";

export default class FlightSorter<T extends FlightData> {
  private data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  private getTimeInMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  sortByDateTime(): T[] {
    return this.data.sort((a, b) => {
      return (
        this.getTimeInMinutes(a.arrivalDateTimeDisplay) -
        this.getTimeInMinutes(b.arrivalDateTimeDisplay)
      );
    });
  }

  sortByPrice(): T[] {
    return this.data.sort((a, b) => getEcoFlyPrice(a) - getEcoFlyPrice(b));
  }
}

export function getEcoFlyPrice(data: FlightData) {
  return (
    data.fareCategories[FareCategories.ECONOMY].subcategories.find(
      ({ brandCode }) => brandCode === BrandCode.ecoFly
    )?.price.amount ?? Infinity
  );
}
