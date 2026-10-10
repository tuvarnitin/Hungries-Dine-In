import { connectDB } from "../../../lib/db";
import Table from "../../../models/tableModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { tableNumber } = await req.json();
		if (!tableNumber) {
			return NextResponse.json(
				{ msg: "Table Number is required." },
				{ status: 401 },
			);
		}
		await connectDB();
		const isExists = await Table.findOne({tableNumber});
		if (isExists) {
			return NextResponse.json(
				{ msg: "This table number is already exists" },
				{ status: 401 },
			);
		}
		const newTable = await Table.create({
			tableNumber
		});

		return NextResponse.json(
			{ table: newTable, msg: `Table ${tableNumber}is created succesfully` },
			{ status: 201 },
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ msg: "Error creating new table", error },
			{ status: 500 },
		);
	}
}
