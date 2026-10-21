
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "Food ID is required" },
      { status: 400 }
    );
  }
  //get food item logic will come here 
  
  return NextResponse.json(
    { message: "Food lookup is not implemented", id },
    { status: 501 }
  );
}

