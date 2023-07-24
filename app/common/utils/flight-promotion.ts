import { BrandCode } from "../models";
import getKeys from "./get-keys";

export default class FlightPromotionHandler {
  private readonly promotionBrandCode: BrandCode;
  private readonly discountRate: number;

  constructor(promotionBrandCode = BrandCode.ecoFly, discountRate = 0.5) {
    this.promotionBrandCode = promotionBrandCode;
    this.discountRate = discountRate;
  }

  private getDiscountedPrice(price: Price): Price {
    return {
      ...price,
      amount: price.amount * this.discountRate,
    };
  }

  private applyDiscountToSubcategory(subcategory: Subcategory): Subcategory {
    if (subcategory.brandCode !== this.promotionBrandCode) return subcategory;

    subcategory.price = this.getDiscountedPrice(subcategory.price);
    return subcategory;
  }

  applyPromotion(flightData: FlightData[]): FlightData[] {
    return flightData.map((flight) => {
      const fareCategories = structuredClone(flight.fareCategories);

      getKeys(fareCategories).forEach((category) => {
        fareCategories[category].subcategories.forEach((subcategory) =>
          this.applyDiscountToSubcategory(subcategory)
        );
      });

      return {
        ...flight,
        fareCategories,
      };
    });
  }
}
