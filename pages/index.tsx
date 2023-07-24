"use client";
import { useEffect } from "react";
import { AirportSelect } from "@/app/components/airport-select";
import dynamic from "next/dynamic";
import PassengerForm from "@/app/components/passenger-form";
import Image from "next/image";
import Loading from "@/app/components/loading";
import { useFlightsMutation } from "@/app/hooks/useFlights";
import { useNotificationStore } from "@/app/store/notifications";
import { useFlightsStore } from "@/app/store/flights";
import { FilterByValueType } from "@/app/common/models";

const DateSelect = dynamic(() => import("@/app/components/date-select"), {
  ssr: false,
});

export default function Page() {
  const { mutate: fetchFlights, isLoading } = useFlightsMutation();
  const { addNotification, dismissAll } = useNotificationStore();
  const { originAirport, destinationAirport, peopeCount, setStore } =
    useFlightsStore();

  function handleAirport<
    T1 extends keyof FilterByValueType<FlightData, IAirport>
  >(key: T1) {
    return (value: string) => {
      setStore({ [key]: value });
      dismissAll();
    };
  }

  function warnIfUndefined(value: string | number | null, warning: string) {
    if (!value) {
      addNotification({
        type: "warning",
        title: warning,
      });
    }
  }

  useEffect(() => {
    document.body.style.backgroundColor = "#063048";
    return () => {
      document.body.style.backgroundColor = "transparent";
    };
  }, []);

  async function handleSubmit() {
    dismissAll();
    warnIfUndefined(originAirport, "Lütfen kalkış havaalanını seçiniz.");
    warnIfUndefined(destinationAirport, "Lütfen varış havaalanını seçiniz.");
    warnIfUndefined(peopeCount, "En az bir yolcu olmak zorunda.");

    if (peopeCount > 0 && originAirport && destinationAirport) {
      fetchFlights({
        origin: originAirport,
        destination: destinationAirport,
      });
    }
  }

  return (
    <div className="mt-40">
      <h1 className="pb-4 mt-0 mb-2 text-2xl font-normal text-center text-white xl:text-2xl">
        Merhaba
        <p className="mt-0 mb-4 leading-7 text-white">
          Nereyi keşfetmek istersiniz?
        </p>
      </h1>

      <div
        className="max-w-4xl px-6 py-8 mx-auto mt-1"
        style={{ backgroundColor: "rgb(96 105 119 / 60%)" }}
      >
        <div className="flex flex-row gap-0.5 items-stretch justify-around">
          <div className="basis-4/12">
            <AirportSelect
              label="Nereden"
              icon="origin"
              onChange={handleAirport("originAirport")}
            />
          </div>
          <div className="basis-4/12">
            <AirportSelect
              label="Nereye"
              icon="destination"
              onChange={handleAirport("destinationAirport")}
            />
          </div>
          <div className="basis-3/12">
            <DateSelect />
          </div>
          <div className="basis-2/12">
            <PassengerForm onUpdate={setStore} />
          </div>
          <div className="basis-1/12">
            <button
              className="block w-full h-full bg-red-700"
              onClick={handleSubmit}
            >
              <Image
                className="mx-auto"
                src={`/next.svg`}
                alt={"next"}
                width={30}
                height={30}
                priority
              />
            </button>
          </div>
        </div>
        {isLoading && <Loading />}
      </div>
    </div>
  );
}
