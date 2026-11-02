"use client";

import { useEffect, useRef, useState } from "react";

interface OTPVerificationProps {
    email: string;
    onVerify: (otp: string) => Promise<void> | void;
    onResend: () => Promise<void> | void;
}

const OTP_LENGTH = 6;
const RESEND_TIME = 30;

export default function Otp({
    email,
    onVerify,
    onResend,
}: OTPVerificationProps) {
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [seconds, setSeconds] = useState(RESEND_TIME);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState("");

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Resend countdown
    useEffect(() => {
        if (seconds <= 0) return;

        const timer = setTimeout(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [seconds]);

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

    const isOtpComplete = otp.every((digit) => digit !== "");

    return (
        <main className="min-h-screen bg-[#F6F3E9] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                {/* OTP Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-[0_15px_50px_rgba(2,51,32,0.07)] border border-[#023320]/5">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-full bg-[#F6F3E9] flex items-center justify-center">
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
                    <button
                        type="button"
                        onClick={handleVerify}
                        disabled={!isOtpComplete || isVerifying}
                        className="mt-7 w-full h-13 rounded-xl bg-[#023320] text-white font-semibold text-sm hover:bg-[#03452B] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isVerifying ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            "Verify & Continue"
                        )}
                    </button>

                    {/* Resend OTP */}
                    <div className="mt-7 text-center">
                        <p className="text-sm text-[#71837A]">Didn't receive the code?</p>

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
        </main>
    );
}
