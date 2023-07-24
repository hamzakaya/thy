"use clint";
import { FareCategories, fareCategories } from "@/app/common/models";
import TickerAirportDisplay from "./airport-display";
import FlightDuration from "./flight-duration";
import TicketPackage from "./ticket-package";
import PackageList from "../package-list";
import { useCallback, useState } from "react";

export default function FlightTicket({ data }: { data: FlightData }) {
  const {
    id,
    arrivalDateTimeDisplay,
    departureDateTimeDisplay,
    originAirport,
    destinationAirport,
    flightDuration,
  } = data;

  const [activeCategory, setCategory] = useState<FareCategories | null>(null);

  const setActiveCategory = useCallback((value: FareCategories | null) => {
    setCategory((prev) => {
      if (prev === value) return null;
      return value;
    });
  }, []);

  return (
    <div className="mb-4" key={id}>
      <div className="flex flex-wrap -mx-3 mt-0">
        <div className="flex-none px-1 mt-0 w-full max-w-full md:w-1/2 md:flex-none">
          <div className="flex relative justify-between items-center py-5 px-4 w-full bg-white">
            <div className="flex relative inset-x-0 justify-between items-center m-auto w-3/4 h-px bg-neutral-600 bg-opacity-30">
              <TickerAirportDisplay
                time={arrivalDateTimeDisplay}
                airport={originAirport}
              />
              <TickerAirportDisplay
                time={departureDateTimeDisplay}
                airport={destinationAirport}
                className="bg-white"
              />
            </div>
            <FlightDuration time={flightDuration} />
          </div>
        </div>
        {fareCategories.map(({ value }) => (
          <div
            key={value}
            className="flex-none px-1 mt-0 w-full max-w-full md:w-1/4 md:flex-none"
          >
            <TicketPackage
              id={id}
              categorie={value}
              subcategories={data.fareCategories[value].subcategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
        ))}
      </div>
      <div className="relative">
        {activeCategory && (
          <div className="flex flex-wrap -mx-3 mt-0 leading-6 text-neutral-800">
            {data.fareCategories[activeCategory].subcategories.map(
              (subData) => (
                <PackageList
                  key={subData.brandCode}
                  subcategories={subData}
                  activeCategory={activeCategory}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
