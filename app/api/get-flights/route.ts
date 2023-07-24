import { NextRequest, NextResponse } from "next/server";
import flights from "@/app/common/data/flights";
import FlightFilter from "@/app/common/utils/flight-filter";

const flightsData = new FlightFilter(flights);

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const data = flightsData
    .filterBy("originAirport", searchParams.get("origin")!)
    .filterBy("destinationAirport", searchParams.get("destination")!)
    .getData();

  if (data.length === 0) {
    return NextResponse.json({ message: "İstediğiniz yön için uçuş bulunmamaktadır" }, { status: 404 });
  }

  return NextResponse.json(data);
}
