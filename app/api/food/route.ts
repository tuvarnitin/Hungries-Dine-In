import { NextResponse } from "next/server";
import Food, { IFood } from "../../../models/foodModel";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
	try {
		const { img, tags, name, rating, estPreparationTime, price, desc }: IFood =
			await req.json();
		if (
			!img ||
			!tags.length ||
			!name ||
			!estPreparationTime ||
			!price ||
			!desc
		) {
			return NextResponse.json(
				{
					message: "All the fields are required.",
				},
				{
					status: 401,
				},
			);
		}

		await connectDB()

		const isExists = await Food.findOne({ name })
		if (isExists) {
			return NextResponse.json({
				message: "This food is already added to the menu."
			}, { status: 400 });
		}

		const food = await Food.create({ img, tags, name, rating, estPreparationTime, price, desc });
		return NextResponse.json(
			{ food },
			{ status: 201 },
		);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ msg: error.message });
	}
}

export async function GET() {
	try {
		await connectDB()
		const foods = await Food.find({ isAvailable: true });
		return NextResponse.json({ foods }, { status: 200 });
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ msg: error.message || "Error while fetching foods.", error }, { status: 500 });
	}
}
