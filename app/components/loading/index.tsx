import Image from "next/image";

export default function Loading() {
  return (
    <div className="absolute w-screen h-screen z-50 bg-slate-700 top-0 left-0 grid place-items-center bg-opacity-75">
      <Image
        className=""
        src={`/loading.gif`}
        alt={"loading"}
        width={80}
        height={80}
        priority
      />
    </div>
  );
}
