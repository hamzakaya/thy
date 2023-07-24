import { BrandCode, FareCategories } from "@/app/common/models";
import { useFlightsStore } from "@/app/store/flights";
import { usePromotionStatus } from "@/app/store/promotion";
import priceFormat from "@/app/utils/price-format";
import { useRouter } from "next/navigation";

type IProps = {
  subcategories: Subcategory;
  activeCategory: FareCategories;
};

export default function PackageList({ subcategories, activeCategory }: IProps) {
  const { brandCode, price, rights, status } = subcategories;

  const router = useRouter();
  const { setStore } = useFlightsStore();
  const { status: promotionStatus } = usePromotionStatus();
  const isDisabled = promotionStatus && brandCode != BrandCode.ecoFly;

  function handleSelected() {
    setStore({
      category: activeCategory,
      subcategory: subcategories,
      status,
    });
    router.push(`/result`);
  }

  return (
    <div className="flex-none px-1 mt-4 w-full max-w-full md:w-1/3 md:flex-none">
      <div className="flex relative flex-col pb-12 min-w-0 h-full break-words bg-clip-border bg-white rounded-md border border-solid border-neutral-300">
        <div className="flex justify-between py-6 px-5 mb-0 border-b border-solid border-neutral-300 bg-stone-100">
          <div className="text-neutral-800 font-bold text-xl">{brandCode}</div>
          <div className="text-neutral-800">
            <span className="relative leading-4 -top-1.5 text-xs mx-1">
              {price.currency}
            </span>
            <span className="text-xl font-semibold">
              {priceFormat(price.amount, price.currency)}
            </span>
          </div>
        </div>
        <div className="text-neutral-800">
          <ul className="flex flex-col pl-0 my-0 rounded-none">
            {rights.map((text, index) => (
              <li
                key={index}
                className="block relative py-2 px-4 text-left border-0 border-b border-solid border-zinc-200 text-sm font-light subpixel-antialiased not-italic"
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className={`inline-block absolute bottom-0 left-0 py-1 px-3 m-0 w-full font-sans text-base font-normal text-center text-white normal-case align-middle  rounded-md border border-white border-solid select-none hover:text-white ${
            isDisabled
              ? "bg-black cursor-default"
              : "cursor-pointer bg-red-600 hover:bg-red-700"
          }`}
          disabled={isDisabled}
          onClick={handleSelected}
        >
          Uçuşu Seç
        </button>
      </div>
    </div>
  );
}
