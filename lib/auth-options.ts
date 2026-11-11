import { connectDB } from "@/lib/db";
import { normalizeEmail, isValidPassword } from "@/lib/auth-validation";
import {
	hashPassword,
	needsPasswordRehash,
	verifyPassword,
} from "@/lib/password";
import User from "@/models/userModel";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Email and password",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const email = normalizeEmail(credentials?.email);
				const password = credentials?.password;
				if (!email || !isValidPassword(password)) return null;

				await connectDB();
				const user = await User.findOne({ email }).select("+password");
				if (
					!user?.password ||
					!(await verifyPassword(password, user.password))
				) {
					return null;
				}

				if (needsPasswordRehash(user.password)) {
					user.password = await hashPassword(password);
					await user.save();
				}

				return {
					id: user._id.toString(),
					name: user.name,
					email: user.email,
					image: user.image ?? null,
				};
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 7 * 24 * 60 * 60,
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (account?.provider) {
				token.authProvider = account.provider;
			}
			if (account?.provider === "credentials" && user?.id) {
				token.userId = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user && token.userId) {
				session.user.id = token.userId;
			}
			if (session.user && token.authProvider) {
				session.user.authProvider = token.authProvider;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};
