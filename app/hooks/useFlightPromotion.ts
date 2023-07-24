import { useMemo } from "react";
import FlightPromotionHandler from "../common/utils/flight-promotion";
import { usePromotionStatus } from "../store/promotion";

const promotionHandler = new FlightPromotionHandler();

export default function useFlightPromotion(flightData: FlightData[]) {
  const { status } = usePromotionStatus();

  return useMemo(() => {
    if (status) return promotionHandler.applyPromotion(flightData);
    return flightData;
  }, [status, flightData]);
}
