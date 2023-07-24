import { expect, test } from "vitest";
import FlightFilter from "./flight-filter";
import mockFlightData from "../data/flights";

test("FlightFilter should correctly filter data", () => {
  const flightFilter = new FlightFilter(mockFlightData);
  const filteredData = flightFilter.filterBy("originAirport", "IST").getData();

  expect(filteredData[0].originAirport.code).toBe("IST");
});

test("FlightFilter should return empty array when there are no matches", () => {
  const flightFilter = new FlightFilter(mockFlightData);
  const filteredData = flightFilter.filterBy("originAirport", "XYZ").getData();

  expect(filteredData).toHaveLength(0);
});
