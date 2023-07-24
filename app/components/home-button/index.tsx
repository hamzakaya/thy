import { useFlightsStore } from "@/app/store/flights";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();
  const { clearStore } = useFlightsStore();

  const handleClick = () => {
    router.push("/");
    clearStore();
  };

  return (
    <div className="flex justify-end mt-6 text-neutral-800">
      <button
        className="inline-block py-1 px-6 font-sans text-base font-normal text-center text-white align-middle bg-red-600 rounded-none border border-white border-solid cursor-pointer select-none hover:bg-red-600 hover:text-white"
        onClick={handleClick}
      >
        Başa Dön
      </button>
    </div>
  );
}
