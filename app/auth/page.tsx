"use client";
import Otp from "@/components/auth/Otp";
import Button from "@/components/Button";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [page, setPage] = useState<"register" | "login" | "otp">("register");

	const handleEmailLogin = (e:React.FormEvent) => {
		e.preventDefault()
		if (!email.trim()) {
			setError("Email is required.");
			return;
		}
		if (!password.trim() || !confirmPassword.trim()) {
			setError("Password is required.");
			return;
		}
		if (password !== confirmPassword) {
			setError("Password and confirm password mismatch.");
			return;
		} else {
			setPage("otp");
		}
	};

	const handleEmailSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;
	};

	const onGoogleLogin = () => {};
	return (
		<div
			className="relative min-h-dvh flex justify-center"
			role="presentation"
		>
			{/* Bottom Sheet */}
			{(page === "login" || page === "register") && (
				<section
					role="dialog"
					aria-modal="true"
					aria-labelledby="login-title"
					className="relative z-10 w-full max-w-md h-fit animate-in slide-in-from-bottom duration-300 rounded-xl bg-white pb-[max(24px,env(safe-area-inset-bottom))] p-4 mt-14"
				>
					<h1 className="text-lg font-bold text-center mb-2">Welcome back</h1>
					{/* Email */}
					<form onSubmit={handleEmailSubmit}>
						<label
							htmlFor="login-email"
							className="mb-2 block text-xs font-semibold text-zinc-600"
						>
							Email
						</label>

						<div className="flex items-center gap-3 rounded-3xl border border-primary/20 bg-white px-4 transition focus-within:border-primary mb-2">
							<Mail
								size={18}
								className="text-[#71837A]"
							/>

							<input
								id="login-email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email address"
								className="w-full bg-transparent py-3 text-sm text-black outline-none placeholder:text-[#71837A]"
							/>
						</div>
						<label
							htmlFor="login-password"
							className="mb-2 block text-xs font-semibold text-zinc-600"
						>
							Password
						</label>
						<div className="flex items-center gap-3 rounded-3xl border border-primary/20 bg-white px-4 transition focus-within:border-primary mb-2">
							<Lock
								size={18}
								className="text-[#71837A]"
							/>

							<input
								id="login-password"
								type="password"
								required
								value={password}
								minLength={6}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password"
								className="w-full bg-transparent py-3 text-sm text-black outline-none placeholder:text-[#71837A]"
							/>
						</div>
						{page === "register" && (
							<>
								<label
									htmlFor="login-password"
									className="mb-2 block text-xs font-semibold text-zinc-600"
								>
									Confirm Password
								</label>
								<div className="flex items-center gap-3 rounded-3xl border border-primary/20 bg-white px-4 transition focus-within:border-primary mb-2">
									<Lock
										size={18}
										className="text-[#71837A]"
									/>

									<input
										id="login-password"
										type="password"
										required
										value={confirmPassword}
										minLength={6}
										onChange={(e) => setConfirmPassword(e.target.value)}
										placeholder="Confirm Password"
										className="w-full bg-transparent py-3 text-sm text-black outline-none placeholder:text-[#71837A]"
									/>
								</div>
							</>
						)}
						{error && <p className="text-[12px] text-red-600">*{error}</p>}
						<Button
							onClick={handleEmailLogin}
							variant="primary"
							size="md"
							className="font-medium mt-3"
							fullWidth
						>
							{page === "register" ? "Create Account" : "Continue"}
						</Button>
					</form>

					{/* Terms */}
					{page === "register" ? (
						<div className="mt-5 text-center text-xs leading-relaxed text-[#71837A]">
							Already have an account ?{" "}
							<button
								onClick={() => setPage("login")}
								className="font-semibold text-[#7F1100]"
							>
								Login
							</button>{" "}
						</div>
					) : (
						<div className="mt-5 text-center text-xs leading-relaxed text-[#71837A]">
							Don't have an account ?{" "}
							<button
								onClick={() => setPage("register")}
								className="font-semibold text-[#7F1100]"
							>
								Register
							</button>{" "}
						</div>
					)}
					{/* Divider */}
					<div className="my-5 flex items-center gap-4">
						<div className="h-px flex-1 bg-zinc-200" />
						<span className="text-xs font-medium text-zinc-500">OR</span>
						<div className="h-px flex-1 bg-zinc-200" />
					</div>
					{/* Google */}
					<Button
						onClick={onGoogleLogin}
						variant="primary"
						size="md"
						icon={
							<Image
								src="/assets/google.png"
								height={20}
								width={20}
								alt="google icon"
							/>
						}
						fullWidth
					>
						Continue with Google
					</Button>
					<div className="my-5 h-px bg-muted-text/50" />

					<p className="text-center text-[12px] text-muted-text">
						You can also continue browsing as a guest.
					</p>
				</section>
			)}
			{page === "otp" && (
				<Otp
					email={email}
					onResend={() => {}}
					onVerify={() => {}}
				/>
			)}
		</div>
	);
};

export default page;
