import { connectDB } from "@/lib/db";
import Table from "@/models/tableModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	console.log(await params);
	try {
		if (!id) {
			return NextResponse.json(
				{ msg: "Table id not provided" },
				{ status: 401 },
			);
		}
		await connectDB();
		if (!mongoose.isValidObjectId(id)) {
			return NextResponse.json(
				{
					msg: "Invalid table id",
				},
				{ status: 400 },
			);
		}
		const table = await Table.findById(id);
		if (!table) {
			return NextResponse.json({ msg: "Invaid table id" }, { status: 404 });
		}
		return NextResponse.json(
			{
				table: {
					id: table._id,
					tableNumber: table.tableNumber,
				},
			},
			{
				status: 200,
			},
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "Error fetching table", error },
			{ status: 500 },
		);
	}
}
