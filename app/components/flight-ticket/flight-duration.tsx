export default function FlightDuration({ time }: { time: string }) {
  return (
    <div className="ml-12 w-1/4">
      <div className="text-xs leading-4 text-gray-500">Uçuş Süresi</div>
      <div className="">{time}</div>
    </div>
  );
}
