import { MongooseCache } from "./lib/db";

declare global {
	var mongooseCache: MongooseCache | undefined;
}
