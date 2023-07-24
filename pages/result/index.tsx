"use client";
import { useMemo } from "react";
import { FlightStatus } from "@/app/common/models";
import { useFlightsStore } from "@/app/store/flights";
import priceFormat from "@/app/utils/price-format";
import Error from "@/app/components/result-error";
import SuccessResult from "@/app/components/result-success";

export default function ResultPage() {
  const { status, peopeCount, subcategory } = useFlightsStore();

  const totalPrice = useMemo(() => {
    if (!subcategory?.price) return "";
    const { amount, currency } = subcategory.price;

    return priceFormat(amount * peopeCount, currency);
  }, [subcategory?.price, peopeCount]);

  return (
    <div id="root" className="leading-6 text-neutral-800">
      <div className="py-12 px-3 mx-auto w-4/6">
        {status == FlightStatus.AVAILABLE ? (
          <SuccessResult totalPrice={totalPrice} />
        ) : (
          <Error text="Kabin seçiminiz tamamlanamadı." />
        )}
      </div>
    </div>
  );
}
