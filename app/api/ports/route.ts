import { NextResponse } from "next/server";
import ports from "@/app/common/data/ports";

export async function GET() {
  return NextResponse.json(ports);
}
