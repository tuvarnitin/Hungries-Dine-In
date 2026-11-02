"use client";

import React, { useEffect, useRef } from "react";
import { Mail, Lock } from "lucide-react";

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	onGoogleLogin: () => void;
	onEmailLogin: (email: string) => void;
}

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";

const OTP_LENGTH = 6;
const RESEND_TIME = 30;

export default function LoginModal({
	isOpen,
	onClose,
	onGoogleLogin,
}: LoginModalProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [page, setPage] = useState<"login" | "register" | "otp">("login");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
	const [seconds, setSeconds] = useState(RESEND_TIME);
	const [isVerifying, setIsVerifying] = useState(false);
	const [isResending, setIsResending] = useState(false);

	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const onResend = async () => {
		
	}
	const onVerify = async (opt:string) => {

	}

	const handleEmailLogin = (e: React.FormEvent) => {
		e.preventDefault();
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

	// Handle OTP input
	const handleChange = (index: number, value: string) => {
		const digit = value.replace(/\D/g, "").slice(-1);

		const newOtp = [...otp];
		newOtp[index] = digit;

		setOtp(newOtp);
		setError("");

		if (digit && index < OTP_LENGTH - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	// Handle keyboard navigation
	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}

		if (e.key === "ArrowLeft" && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}

		if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	// Handle OTP paste
	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();

		const pastedOtp = e.clipboardData
			.getData("text")
			.replace(/\D/g, "")
			.slice(0, OTP_LENGTH);

		if (!pastedOtp) return;

		const newOtp = Array(OTP_LENGTH).fill("");

		pastedOtp.split("").forEach((digit, index) => {
			newOtp[index] = digit;
		});

		setOtp(newOtp);
		setError("");

		const focusIndex = Math.min(pastedOtp.length, OTP_LENGTH - 1);

		inputRefs.current[focusIndex]?.focus();
	};

	// Verify OTP
	const handleVerify = async () => {
		const enteredOtp = otp.join("");

		if (enteredOtp.length !== OTP_LENGTH) return;

		try {
			setIsVerifying(true);
			setError("");

			await onVerify(enteredOtp);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Invalid OTP. Please try again.",
			);
		} finally {
			setIsVerifying(false);
		}
	};

	// Resend OTP
	const handleResend = async () => {
		try {
			setIsResending(true);
			setError("");

			await onResend();

			setOtp(Array(OTP_LENGTH).fill(""));
			setSeconds(RESEND_TIME);
			inputRefs.current[0]?.focus();
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "Unable to resend OTP. Please try again.",
			);
		} finally {
			setIsResending(false);
		}
	};

	useEffect(() => {
		if (!isOpen) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleEscape);

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const handleEmailSubmit = (e: React.FormEvent) => {
		e.preventDefault();

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

	const isOtpComplete = otp.every((digit) => digit !== "");

	return (
		<div
			className="fixed inset-0 z-50 flex items-end justify-center"
			role="presentation"
		>
			{/* Backdrop */}
			<button
				type="button"
				aria-label="Close login modal"
				onClick={onClose}
				className="absolute inset-0 bg-black/50 backdrop-blur-[10px]"
			/>

			{/* Bottom Sheet */}
			<section
				role="dialog"
				aria-modal="true"
				aria-labelledby="login-title"
				className="relative z-10 w-full max-w-md h-fit animate-in slide-in-from-bottom duration-300 rounded-xl bg-white pb-[max(24px,env(safe-area-inset-bottom))] p-4 mt-14"
			>
				{page === "login" || page === "register" ? (
					<>
						<h1 className="text-lg font-bold text-center mb-2">Welcome back</h1>
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
					</>
				) : (
					<div className="w-full max-w-md">
						{/* OTP Card */}
						<div className="bg-white rounded-3xl p-6 sm:p-9">
							{/* Icon */}
							<div className="flex justify-center mb-6">
								<div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="none"
										stroke="#023320"
										strokeWidth="1.5"
										className="w-8 h-8"
									>
										<rect
											x="3"
											y="5"
											width="18"
											height="14"
											rx="3"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="m3 7 9 6 9-6"
										/>
									</svg>
								</div>
							</div>

							{/* Heading */}
							<div className="text-center">
								<h2 className="text-2xl font-bold text-[#17211E]">
									Verify your email
								</h2>

								<p className="mt-3 text-sm leading-6 text-[#71837A]">
									We've sent a 6-digit verification code to
								</p>

								<p className="mt-1 text-sm font-semibold text-[#023320] break-all">
									{email}
								</p>
							</div>

							{/* OTP Inputs */}
							<div className="mt-8">
								<label className="block text-sm font-semibold text-[#17211E] mb-4 text-center">
									Enter verification code
								</label>

								<div className="flex justify-center gap-2 sm:gap-3">
									{otp.map((digit, index) => (
										<input
											key={index}
											ref={(el) => {
												inputRefs.current[index] = el;
											}}
											type="text"
											inputMode="numeric"
											autoComplete={index === 0 ? "one-time-code" : "off"}
											maxLength={1}
											value={digit}
											autoFocus={index === 0}
											onChange={(e) => handleChange(index, e.target.value)}
											onKeyDown={(e) => handleKeyDown(index, e)}
											onPaste={handlePaste}
											aria-label={`OTP digit ${index + 1}`}
											className="w-10 h-12 sm:w-12 sm:h-14 rounded-xl border border-[#DED9CA] bg-[#FDFCFA] text-center text-xl font-bold text-[#023320] outline-none transition-all duration-200 focus:border-[#023320] focus:ring-4 focus:ring-[#023320]/10"
										/>
									))}
								</div>

								<p className="text-center mt-3 text-xs text-[#71837A]">
									Enter the code sent to your email address.
								</p>
							</div>

							{/* Error */}
							{error && (
								<p
									role="alert"
									className="mt-5 text-sm text-[#7F1100] text-center bg-[#7F1100]/5 rounded-xl px-3 py-2"
								>
									{error}
								</p>
							)}

							{/* Verify Button */}
							<Button
								type="button"
								variant="primary"
								onClick={handleVerify}
								disabled={!isOtpComplete || isVerifying}
								fullWidth
								className="mt-2"
							>
								{isVerifying ? (
									<>
										<span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
										Verifying...
									</>
								) : (
									"Verify & Continue"
								)}
							</Button>

							{/* Resend OTP */}
							<div className="mt-7 text-center">
								<p className="text-sm text-[#71837A]">
									Didn't receive the code?
								</p>

								<button
									type="button"
									onClick={handleResend}
									disabled={seconds > 0 || isResending}
									className="mt-2 text-sm font-semibold text-[#023320] hover:text-[#7F1100] transition-colors disabled:text-[#A5ADA7] disabled:cursor-not-allowed"
								>
									{isResending
										? "Sending..."
										: seconds > 0
											? `Resend OTP in ${seconds}s`
											: "Resend OTP"}
								</button>
							</div>
						</div>

						{/* Footer */}
						<div className="mt-7 flex items-center justify-center gap-2 text-[#71837A]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.7"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m9 12 2 2 4-4"
								/>
							</svg>

							<p className="text-xs">Your information is safe and secure.</p>
						</div>
					</div>
				)}
			</section>
			{}
		</div>
	);
}
