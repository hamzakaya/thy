import { expect, test } from "vitest";
import FlightSorter, { getEcoFlyPrice } from "./flight-sorter";
import flightData from "../data/flights";
import { FareCategories } from "../models";

test("FlightSorter should correctly sort by date", () => {
  const mockFlightData = structuredClone(flightData)
  const flightSorter = new FlightSorter(mockFlightData);
  const sortedFlights = flightSorter.sortByDateTime();

  expect(sortedFlights[0].arrivalDateTimeDisplay).toBe("01:15");
  expect(sortedFlights[1].arrivalDateTimeDisplay).toBe("09:50");
});

test("FlightSorter should correctly sort by price", () => {
  const mockFlightData = structuredClone(flightData)
  const flightSorter = new FlightSorter(mockFlightData);
  const sortedFlights = flightSorter.sortByPrice();

  expect(
    sortedFlights[0].fareCategories[FareCategories.ECONOMY].subcategories[0]
      .price.amount
  ).toBe(195);
  
  expect(
    sortedFlights[1].fareCategories[FareCategories.ECONOMY].subcategories[0]
      .price.amount
  ).toBe(242);
});

test("getEcoFlyPrice should correctly find ecoFly price", () => {
  const mockFlightData = structuredClone(flightData)
  const minPrice = getEcoFlyPrice(mockFlightData[0]);

  expect(minPrice).toBe(242.00);
});
