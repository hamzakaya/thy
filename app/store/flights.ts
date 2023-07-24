import { create } from "zustand";
import { FareCategories, FlightStatus } from "../common/models";

export type FlightsStore = {
  originAirport: string;
  destinationAirport: string;
  peopeCount: number;
  category: FareCategories;
  subcategory: Subcategory;
  status: FlightStatus;
  setStore: (nextState: Partial<FlightsStore>) => void;
  clearStore: () => void;
};

const initialState = {
  peopeCount: 0,
  originAirport: null!,
  destinationAirport: null!,
  subcategory: null!,
  category: FareCategories.ECONOMY,
  status: FlightStatus.ERROR,
};

export const useFlightsStore = create<FlightsStore>((set) => ({
  ...initialState,
  setStore: (nextState: Partial<FlightsStore>) =>
    set((state) => ({
      ...state,
      ...nextState,
    })),
  clearStore: () =>
    set((state) => ({
      ...state,
      ...initialState,
    })),
}));
