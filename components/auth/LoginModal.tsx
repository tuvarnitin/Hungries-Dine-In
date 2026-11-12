"use client";

import Button from "@/components/Button";
import {
	isValidPassword,
	MAX_PASSWORD_LENGTH,
	MIN_PASSWORD_LENGTH,
	normalizeEmail,
} from "@/lib/auth-validation";
import { Lock, Mail, UserRound } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { notifyError } from "@/lib/toast-notifications";

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	onGoogleLogin: () => void;
}

type AuthMode = "login" | "register";

export default function LoginModal({
	isOpen,
	onClose,
	onGoogleLogin,
}: LoginModalProps) {
	const [mode, setMode] = useState<AuthMode>("login");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (!isOpen) return;

		const previousOverflow = document.body.style.overflow;
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleEscape);

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const handleModeChange = (nextMode: AuthMode) => {
		setMode(nextMode);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const normalizedEmail = normalizeEmail(email);
		if (!normalizedEmail) {
			toast.error("Enter a valid email address.");
			return;
		}
		if (!isValidPassword(password)) {
			toast.error("Password must be between 8 and 128 characters.");
			return;
		}
		if (mode === "register") {
			if (!name.trim() || name.trim().length > 80) {
				toast.error("Enter a name between 1 and 80 characters.");
				return;
			}
			if (password !== confirmPassword) {
				toast.error("Passwords do not match.");
				return;
			}
		}

		setIsSubmitting(true);
		let guestOrderTransferPending = false;
		try {
			if (mode === "register") {
				const { data: result } = await axios.post<{
					guestOrdersTransferred?: boolean;
				}>("/api/auth/register", {
					name: name.trim(),
					email: normalizedEmail,
					password,
				});

				guestOrderTransferPending =
					result.guestOrdersTransferred === false;
				if (guestOrderTransferPending) {
					toast.warning(
						"Account created, but guest order transfer is pending. Refresh your orders to retry.",
					);
				}
			}

			const result = await signIn("credentials", {
				email: normalizedEmail,
				password,
				redirect: false,
			});

			if (!result?.ok) {
				toast.error(
					mode === "register"
						? "Account created, but sign-in failed. Please log in."
						: "Invalid email or password.",
				);
				if (mode === "register") setMode("login");
				return;
			}

			if (!guestOrderTransferPending) {
				toast.success(
					mode === "register" ? "Account created successfully." : "Logged in successfully.",
				);
			}
			if (mode === "login" || !guestOrderTransferPending) onClose();
		} catch (error: unknown) {
			notifyError(error, "Unable to complete sign-in. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-end justify-center"
			role="presentation"
		>
			<button
				type="button"
				aria-label="Close login modal"
				onClick={onClose}
				className="absolute inset-0 bg-black/50 backdrop-blur-[10px]"
			/>

			<section
				role="dialog"
				aria-modal="true"
				aria-labelledby="login-title"
				className="relative z-10 mt-14 h-fit w-full max-w-md animate-in slide-in-from-bottom rounded-xl bg-white p-4 pb-[max(24px,env(safe-area-inset-bottom))] duration-300"
			>
				<h1
					id="login-title"
					className="mb-2 text-center text-lg font-bold"
				>
					{mode === "register" ? "Create your account" : "Welcome back"}
				</h1>

				<form onSubmit={handleSubmit} noValidate>
					{mode === "register" && (
						<>
							<label
								htmlFor="register-name"
								className="mb-2 block text-xs font-semibold text-zinc-600"
							>
								Name
							</label>
							<div className="mb-2 flex items-center gap-3 rounded-3xl border border-primary/20 bg-white px-4 transition focus-within:border-primary">
								<UserRound size={18} className="text-[#71837A]" />
								<input
									id="register-name"
									type="text"
									autoComplete="name"
									maxLength={80}
									required
									value={name}
									onChange={(event) => setName(event.target.value)}
									placeholder="Your name"
									className="w-full bg-transparent py-3 text-sm text-black outline-none placeholder:text-[#71837A]"
								/>
							</div>
						</>
					)}

					<label
						htmlFor="login-email"
						className="mb-2 block text-xs font-semibold text-zinc-600"
					>
						Email
					</label>
					<div className="mb-2 flex items-center gap-3 rounded-3xl border border-primary/20 bg-white px-4 transition focus-within:border-primary">
						<Mail size={18} className="text-[#71837A]" />
						<input
							id="login-email"
							type="email"
							autoComplete="email"
							maxLength={254}
							required
							value={email}
							onChange={(event) => setEmail(event.target.value)}
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
					<div className="mb-2 flex items-center gap-3 rounded-3xl border border-primary/20 bg-white px-4 transition focus-within:border-primary">
						<Lock size={18} className="text-[#71837A]" />
						<input
							id="login-password"
							type="password"
							autoComplete={
								mode === "register" ? "new-password" : "current-password"
							}
							minLength={MIN_PASSWORD_LENGTH}
							maxLength={MAX_PASSWORD_LENGTH}
							required
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							placeholder="Password"
							className="w-full bg-transparent py-3 text-sm text-black outline-none placeholder:text-[#71837A]"
						/>
					</div>

					{mode === "register" && (
						<>
							<label
								htmlFor="confirm-password"
								className="mb-2 block text-xs font-semibold text-zinc-600"
							>
								Confirm password
							</label>
							<div className="mb-2 flex items-center gap-3 rounded-3xl border border-primary/20 bg-white px-4 transition focus-within:border-primary">
								<Lock size={18} className="text-[#71837A]" />
								<input
									id="confirm-password"
									type="password"
									autoComplete="new-password"
									minLength={MIN_PASSWORD_LENGTH}
									maxLength={MAX_PASSWORD_LENGTH}
									required
									value={confirmPassword}
									onChange={(event) => setConfirmPassword(event.target.value)}
									placeholder="Confirm password"
									className="w-full bg-transparent py-3 text-sm text-black outline-none placeholder:text-[#71837A]"
								/>
							</div>
						</>
					)}

					<Button
						type="submit"
						variant="primary"
						size="md"
						loading={isSubmitting}
						disabled={isSubmitting}
						className="mt-3 font-medium"
						fullWidth
					>
						{mode === "register" ? "Create Account" : "Log in"}
					</Button>
				</form>

				<div className="mt-5 text-center text-xs leading-relaxed text-[#71837A]">
					{mode === "register" ? (
						<>
							Already have an account?{" "}
							<button
								type="button"
								onClick={() => handleModeChange("login")}
								className="font-semibold text-[#7F1100]"
							>
								Log in
							</button>
						</>
					) : (
						<>
							Don&apos;t have an account?{" "}
							<button
								type="button"
								onClick={() => handleModeChange("register")}
								className="font-semibold text-[#7F1100]"
							>
								Register
							</button>
						</>
					)}
				</div>

				<div className="my-5 flex items-center gap-4">
					<div className="h-px flex-1 bg-zinc-200" />
					<span className="text-xs font-medium text-zinc-500">OR</span>
					<div className="h-px flex-1 bg-zinc-200" />
				</div>

				<Button
					onClick={onGoogleLogin}
					variant="primary"
					size="md"
					icon={
						<Image
							src="/assets/google.png"
							height={20}
							width={20}
							alt="Google icon"
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
		</div>
	);
}
