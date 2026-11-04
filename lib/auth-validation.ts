export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 128;

export function normalizeEmail(value: unknown): string | null {
	if (typeof value !== "string") return null;

	const email = value.trim().toLowerCase();
	if (
		email.length > 254 ||
		!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
	) {
		return null;
	}

	return email;
}

export function isValidPassword(value: unknown): value is string {
	return (
		typeof value === "string" &&
		value.length >= MIN_PASSWORD_LENGTH &&
		value.length <= MAX_PASSWORD_LENGTH
	);
}

export function normalizeName(value: unknown): string | null {
	if (typeof value !== "string") return null;

	const name = value.trim();
	return name.length > 0 && name.length <= 80 ? name : null;
}
