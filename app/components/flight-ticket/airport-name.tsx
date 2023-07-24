import ports from "@/app/common/data/ports";

export default function AirportName({ code }: { code: string }) {
  const find = ports.find((i) => i.code === code);
  if (!find) return null;

  return (
    <>
      {find.city} ({code})
    </>
  );
}
