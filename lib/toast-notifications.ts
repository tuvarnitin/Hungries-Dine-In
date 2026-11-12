"use client";

import axios from "axios";
import { toast } from "react-toastify";

type ApiErrorResponse = {
	error?: unknown;
	message?: unknown;
	msg?: unknown;
};

export function notifyError(error: unknown, fallback: string) {
	let message: string | undefined;

	if (axios.isAxiosError<ApiErrorResponse>(error)) {
		const response = error.response?.data;
		const serverMessage =
			response?.message ?? response?.error ?? response?.msg;
		if (typeof serverMessage === "string" && serverMessage.trim()) {
			message = serverMessage;
		}
	}

	if (!message && error instanceof Error && error.message) {
		message = error.message;
	}

	toast.error(message ?? fallback);
}
