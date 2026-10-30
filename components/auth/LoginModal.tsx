"use client";

import { useEffect } from "react";
import { X, Utensils, Mail, GoalIcon, Lock } from "lucide-react";

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	onGoogleLogin: () => void;
	onEmailLogin: (email: string) => void;
}

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

export default function LoginModal({
	isOpen,
	onClose,
	onGoogleLogin,
	onEmailLogin,
}: LoginModalProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

    const handleEmailLogin = () => {

    }

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

		if (!email.trim()) return;

		onEmailLogin(email.trim().toLowerCase());
	};

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
				className="relative z-10 w-full max-w-md animate-in slide-in-from-bottom duration-300 rounded-t-[20px] bg-[#F6F3E9] px-6 pb-[max(24px,env(safe-area-inset-bottom))] pt-3 shadow-2xl"
			>
				{/* Drag Handle */}
				<div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-[#BF9961]/50" />

				{/* Header */}
				<div className="mb-6 flex items-center justify-end absolute top-3 right-3">
					<button
						onClick={onClose}
						aria-label="Close"
						className="rounded-full p-2 text-black transition hover:bg-black/10"
					>
						<X size={20} />
					</button>
				</div>

				{/* Brand */}
				<div className="mb-6 flex flex-col items-center text-center">
					<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-gold">
						<Utensils size={30} />
					</div>

					<h2
						id="login-title"
						className="text-xl font-bold tracking-tight text-black"
					>
						Good food, better experiences.
					</h2>

					<p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-text">
						Sign in or create an account to enjoy a seamless dining experience.
					</p>
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

				{/* Divider */}
				<div className="my-5 flex items-center gap-4">
					<div className="h-px flex-1 bg-zinc-200" />
					<span className="text-xs font-medium text-zinc-500">OR</span>
					<div className="h-px flex-1 bg-zinc-200" />
				</div>

				{/* Email */}
				<form onSubmit={handleEmailSubmit}>
					<label
						htmlFor="login-email"
						className="mb-2 block text-sm font-semibold text-black"
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
						className="mb-2 block text-sm font-semibold text-black"
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
							placeholder="Enter Password"
							className="w-full bg-transparent py-3 text-sm text-black outline-none placeholder:text-[#71837A]"
						/>
					</div>
					<Button
						onClick={handleEmailLogin}
						variant="primary"
						size="md"
                        className="font-medium"
						fullWidth
					>
						Continue
					</Button>
				</form>

				{/* Terms */}
				<p className="mt-5 text-center text-xs leading-relaxed text-[#71837A]">
					Don't have an account ?{" "}
					<Link
						href="/resiter"
						className="font-semibold text-[#7F1100]"
					>
						SignUp
					</Link>{" "}
				</p>
				<div className="my-5 h-px bg-[#D8D0BC]" />

				<p className="text-center text-xs text-[#71837A]">
					You can also continue browsing as a guest.
				</p>
			</section>
		</div>
	);
}
