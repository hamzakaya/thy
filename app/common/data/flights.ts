import { randomUUID } from "crypto";
import data from "./flights.json";

export default data.flights.map((flight) => {
  return { ...flight, id: randomUUID() };
}) as FlightData[];
