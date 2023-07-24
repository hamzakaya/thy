import HomeButton from "../home-button";

export default function SuccessResult({ totalPrice }: { totalPrice: string }) {
  return (
    <>
      <div className="pb-6 mb-6 border-b border-solid border-zinc-200">
        <div className="text-2xl leading-9 xl:text-2xl">
          <span className="mr-6 font-bold float-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-12 h-12 text-green-700 align-middle -mt-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                className=""
              ></path>
            </svg>
          </span>
          Kabin seçiminiz tamamlandı.
        </div>
      </div>

      <div className="flex justify-between text-neutral-800">
        <div className="text-2xl leading-9 xl:text-2xl">Toplam Tutar</div>
        <div className="text-2xl leading-9 text-blue-600 xl:text-2xl">
          {totalPrice}
        </div>
      </div>

      <HomeButton />
    </>
  );
}
