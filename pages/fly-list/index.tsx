"use client";
import React, { useState } from "react";

// components
import AirportName from "@/app/components/flight-ticket/airport-name";
import PromotionSwitch from "@/app/components/promotion-switch";
import Loading from "@/app/components/loading";

// hooks
import useFlightPromotion from "@/app/hooks/useFlightPromotion";
import useFlightSorter from "@/app/hooks/useFlightSorter";
import FlightTicket from "@/app/components/flight-ticket";
import useSortButtons from "@/app/hooks/useSortButtons";
import { useFlights } from "@/app/hooks/useFlights";
import Error from "@/app/components/result-error";
import { useFlightsStore } from "@/app/store/flights";
import { SortType } from "@/app/common/models";

export default function List() {
  const { peopeCount, originAirport, destinationAirport } = useFlightsStore();

  const [sortType, setSortType] = useState<SortType>(SortType.Price);
  const sortButtons = useSortButtons(sortType, setSortType);

  const { data, isLoading, isError, isRefetchError } = useFlights({
    origin: originAirport,
    destination: destinationAirport,
  });

  const result = useFlightSorter(
    useFlightPromotion(Array.from(data ?? [])),
    sortType
  );

  if (isError || isRefetchError || !peopeCount)
    return (
      <div className="w-8/12 mx-auto text-center my-11">
        <Error text="Bilet bulunamadı !" />
      </div>
    );

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="py-12 px-3 mx-auto w-5/6 leading-6 text-neutral-800">
        <div className="inline-block px-12 mb-4 text-white bg-red-600 hover:bg-red-600 hover:text-white">
          UÇUŞ
        </div>
        <h1 className="pb-6 mt-0 mb-2 text-2xl font-medium xl:text-2xl">
          <AirportName code={originAirport} />
          <AirportName code={destinationAirport} />, {peopeCount} Yolcu
        </h1>
        <div className="flex mb-4 text-neutral-800">
          <p className="mt-0 mr-4 mb-4 font-semibold">Promosyon Kodu</p>
          <div className="block mb-px">
            <PromotionSwitch />
          </div>
        </div>
        <div className="bg-gray-50 border border-solid border-zinc-200">
          <div className="flex justify-end items-center p-4 text-sm leading-5 text-white bg-slate-800">
            <div className="pr-6">Sıralama Kriteri</div>
            {sortButtons}
          </div>
          <div className="px-6 pt-4 text-neutral-800">
            {result.map((data) => (
              <FlightTicket data={data} key={data.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
