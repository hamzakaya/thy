import { FilterByValueType } from "../models";

export default class FlightFilter<T extends FlightData> {
  private data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  filterBy(
    key: keyof FilterByValueType<FlightData, IAirport>,
    value: string
  ): FlightFilter<T> {
    return new FlightFilter(
      this.data.filter((item) => item[key].code === value)
    );
  }

  getData(): T[] {
    return this.data;
  }
}
