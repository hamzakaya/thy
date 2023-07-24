import { BrandCode, FareCategories } from "@/app/common/models";
import priceFormat from "@/app/utils/price-format";
import { useCallback } from "react";

type IProps = {
  id: string;
  subcategories: Subcategory[];
  categorie: FareCategories;
  brandCode?: BrandCode;
  setActiveCategory: (value: FareCategories | null) => void;
  activeCategory: FareCategories | null;
};

export default function TicketPackage({
  id,
  activeCategory,
  subcategories,
  categorie,
  brandCode = BrandCode.ecoFly,
  setActiveCategory,
}: IProps) {
  const {
    price: { amount, currency },
  } = subcategories.find((i) => i.brandCode === brandCode)!;

  const uniqueId = `${id}_${categorie}`;
  const status = activeCategory === categorie;

  const handleCallback = useCallback(
    (categorie: FareCategories) => () => {
      if (status) setActiveCategory(null);
      else setActiveCategory(categorie);
    },
    [status, setActiveCategory]
  );

  return (
    <div aria-hidden="true" className="flex h-full cursor-pointer">
      <label
        htmlFor={uniqueId}
        className={`flex relative items-center py-5 px-4 w-full bg-white cursor-pointer hover:shadow-md ${
          status && "shadow-md"
        }`}
      >
        <div className="flex p-0 mr-6 mb-px">
          <input
            id={uniqueId}
            type="checkbox"
            name="radio"
            value={categorie}
            className="m-0 w-4 h-4 text-black cursor-pointer"
            aria-labelledby={uniqueId}
            aria-describedby={uniqueId}
            checked={status}
            onChange={handleCallback(categorie)}
          ></input>
          <label
            htmlFor={uniqueId}
            className="pl-2 text-xs leading-4 cursor-pointer"
          >
            {categorie}
          </label>
        </div>
        <div className="">
          <div className="text-xs leading-4 text-gray-500">Yolcu Başına</div>
          <div className="font-semibold">
            {currency} {priceFormat(amount, currency)}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="absolute inset-y-0 m-auto w-4 h-4 align-middle right-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              className=""
            ></path>
          </svg>
        </div>
      </label>
    </div>
  );
}
