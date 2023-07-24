import { expect, test } from "vitest";
import FlightPromotionHandler from "./flight-promotion";
import { BrandCode, FareCategories, FlightStatus } from "../models";
import { nanoid } from 'nanoid';

const mockAirportData: IAirport = {
  code: "ABC",
  name: "Test Airport",
  city: {
    code: "CITY",
    name: "Test City",
  },
  country: {
    code: "CTRY",
    name: "Test Country",
  },
};

const mockFlightData: FlightData = {
  id: nanoid(),
  originAirport: mockAirportData,
  destinationAirport: mockAirportData,
  arrivalDateTimeDisplay: "2023-07-22T18:00:00",
  departureDateTimeDisplay: "2023-07-22T18:00:00",
  flightDuration: "2h 30m",
  fareCategories: {
    [FareCategories.BUSINESS]: {
      subcategories: [
        {
          brandCode: BrandCode.primeFly,
          price: {
            amount: 500,
            currency: "USD",
          },
          order: 1,
          status: FlightStatus.AVAILABLE,
          rights: [],
        },
      ],
    },
    [FareCategories.ECONOMY]: {
      subcategories: [
        {
          brandCode: BrandCode.ecoFly,
          price: {
            amount: 200,
            currency: "USD",
          },
          order: 2,
          status: FlightStatus.AVAILABLE,
          rights: [],
        },
      ],
    },
  },
};

test("FlightPromotionHandler should correctly apply promotion to specific brand", () => {
  const promotionHandler = new FlightPromotionHandler();
  const promotedFlights = promotionHandler.applyPromotion([mockFlightData]);

  expect(
    promotedFlights[0].fareCategories[FareCategories.ECONOMY].subcategories[0]
      .price.amount
  ).toBe(100);
  expect(
    promotedFlights[0].fareCategories[FareCategories.BUSINESS].subcategories[0]
      .price.amount
  ).toBe(500);
});

test("FlightPromotionHandler should not apply promotion to other brands", () => {
  const promotionHandler = new FlightPromotionHandler(BrandCode.extraFly, 0.5);
  const promotedFlights = promotionHandler.applyPromotion([mockFlightData]);

  expect(
    promotedFlights[0].fareCategories[FareCategories.ECONOMY].subcategories[0]
      .price.amount
  ).toBe(200);
  expect(
    promotedFlights[0].fareCategories[FareCategories.BUSINESS].subcategories[0]
      .price.amount
  ).toBe(500);
});
