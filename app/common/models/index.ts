export enum FareCategories {
  BUSINESS = "BUSINESS",
  ECONOMY = "ECONOMY",
}

export const fareCategories = [
  {
    label: "Economy Class",
    value: FareCategories.ECONOMY,
  },
  {
    label: "Bussines Class",
    value: FareCategories.BUSINESS,
  },
];

export enum BrandCode {
  ecoFly = "ecoFly",
  extraFly = "extraFly",
  primeFly = "primeFly",
}

export enum FlightStatus {
  AVAILABLE = "AVAILABLE",
  ERROR = "ERROR",
}

export enum SortType {
  DateTime = "DateTime",
  Price = "Price",
}

export const sortTypes = [
  {
    label: "Ekonomi Ücreti",
    value: SortType.Price,
  },
  {
    label: "Kalkış Saati",
    value: SortType.DateTime,
  },
];

declare global {
  interface FlightData {
    id: string;
    originAirport: IAirport;
    destinationAirport: IAirport;
    arrivalDateTimeDisplay: string;
    departureDateTimeDisplay: string;
    flightDuration: string;
    fareCategories: Record<FareCategories, { subcategories: Subcategory[] }>;
  }

  interface ICodeName {
    code: string;
    name: string;
  }

  interface IAirport extends ICodeName {
    city: ICodeName;
    country: ICodeName;
  }

  interface Subcategory {
    brandCode: BrandCode;
    price: Price;
    order: number;
    status: FlightStatus;
    rights: string[];
  }

  interface Price {
    amount: number;
    currency: string;
  }

  export interface IPortItem extends ICodeName {
    city: string;
    port: Port;
    type: "port" | "city";
  }

  export interface Port extends ICodeName {
    data: Data;
  }

  export interface Data {
    predictions?: string[];
  }
}

export type FilterByValueType<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};
