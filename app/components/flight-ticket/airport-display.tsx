export default function TickerAirportDisplay({
  time,
  airport,
  className,
}: {
  time: string;
  airport: IAirport;
  className?: string;
}) {
  return (
    <div className={`bg-white ${className}`}>
      <div className="">{time}</div>
      <div className="text-gray-500">{airport.code}</div>
      <div className="text-xs leading-4 text-gray-500">{airport.city.name}</div>
    </div>
  );
}
