import { NextResponse } from "next/server";
import { queryFoodtrucksByPrompt } from "../_services/foodtruckController/foodTruckController";

export async function POST(req: Request) {
  const body = await req.json();
  const prompt = body.prompt;

  const candidates = await queryFoodtrucksByPrompt(prompt);
  return NextResponse.json(candidates);
}
