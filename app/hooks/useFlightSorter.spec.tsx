import { expect, test } from "vitest";
import React from "react";
import TestRenderer from "react-test-renderer";
import useFlightSorter from "./useFlightSorter";
import { FareCategories, SortType } from "../common/models";
import mockFlightData from "../common/data/flights";

test("useFlightSorter should return flight data sorted by datetime", () => {
  const testRenderer = TestRenderer.create(
    <HookWrapper flightData={mockFlightData} sortType={SortType.DateTime} />
  );
  const sortedFlightData = JSON.parse(
    testRenderer.root.findByProps({ "data-testid": "sortedFlightData" })
      .children[0] as string
  );

  expect(sortedFlightData[0].arrivalDateTimeDisplay).toBe("01:15");
  expect(sortedFlightData[1].arrivalDateTimeDisplay).toBe("09:50");
});

test("useFlightSorter should return flight data sorted by price", () => {
  const testRenderer = TestRenderer.create(
    <HookWrapper flightData={mockFlightData} sortType={SortType.Price} />
  );
  const sortedFlightData = JSON.parse(
    testRenderer.root.findByProps({ "data-testid": "sortedFlightData" })
      .children[0] as string
  );

  expect(
    sortedFlightData[0].fareCategories[FareCategories.ECONOMY].subcategories[0]
      .price.amount
  ).toBe(195);
  expect(
    sortedFlightData[1].fareCategories[FareCategories.ECONOMY].subcategories[0]
      .price.amount
  ).toBe(242);
});


function HookWrapper({
  flightData,
  sortType,
}: {
  flightData: FlightData[];
  sortType: SortType;
}) {
  const sortedFlightData = useFlightSorter(flightData, sortType);
  return (
    <div data-testid="sortedFlightData">{JSON.stringify(sortedFlightData)}</div>
  );
}
