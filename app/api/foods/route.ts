import { NextResponse } from "next/server";
import Food, { IFood } from "@/models/foodModel";
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

		await connectDB();

		const isExists = await Food.findOne({ name });
		if (isExists) {
			return NextResponse.json(
				{
					message: "This food is already added to the menu.",
				},
				{ status: 400 },
			);
		}

		const food = await Food.create({
			img,
			tags,
			name,
			rating,
			estPreparationTime,
			price,
			desc,
		});
		return NextResponse.json({ food }, { status: 201 });
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({ msg: error.message });
	}
}

export async function GET(req: Request) {
	try {
		await connectDB();
		const searchParams = new URLSearchParams(req.url.split("?")[1]);

		const category = searchParams.get("category");
		const page = searchParams.get("page");
		const limit = searchParams.get("limit");

		const currPage = Math.max(1, Number(page) || 1);
		const currLimit = Math.min(24, Math.max(1, Number(limit) || 12));

		let filter: Record<string, unknown> = { isAvailable: true };

		if (category) {
			filter.category = category;
		}

		const foods = await Food.find(filter)
			.sort({ _id: 1 })
			.skip((currPage - 1) * currLimit)
			.limit(currLimit + 1);

		console.log(foods.length);

		const hasMore = foods.length > currLimit;

		if (hasMore) {
			foods.pop();
		}

		const nextPage = hasMore ? currPage + 1 : null;

		return NextResponse.json({ foods, hasMore, nextPage }, { status: 200 });
	} catch (error: any) {
		console.log(error);
		return NextResponse.json(
			{ msg: error.message || "Error while fetching foods.", error },
			{ status: 500 },
		);
	}
}
