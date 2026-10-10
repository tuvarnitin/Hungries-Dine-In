import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({msg:"Server is healthy and running"},{status:200})
}