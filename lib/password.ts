import { createHash, scrypt, timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";

const BCRYPT_ROUNDS = 12;
const KEY_LENGTH = 64;
const BCRYPT_SHA256_PREFIX = "bcrypt-sha256:";

function deriveLegacyKey(password: string, salt: Buffer): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		scrypt(password, salt, KEY_LENGTH, (error, key) => {
			if (error) {
				reject(error);
				return;
			}

			resolve(key);
		});
	});
}

function prehashPassword(password: string): string {
	return createHash("sha256").update(password, "utf8").digest("hex");
}

export async function hashPassword(password: string): Promise<string> {
	const hash = await bcrypt.hash(prehashPassword(password), BCRYPT_ROUNDS);
	return `${BCRYPT_SHA256_PREFIX}${hash}`;
}

export async function verifyPassword(
	password: string,
	storedHash: string,
): Promise<boolean> {
	if (storedHash.startsWith(BCRYPT_SHA256_PREFIX)) {
		return bcrypt.compare(
			prehashPassword(password),
			storedHash.slice(BCRYPT_SHA256_PREFIX.length),
		);
	}

	const legacyScryptMatch =
		/^scrypt:([a-f0-9]{32}):([a-f0-9]{128})$/.exec(storedHash);
	if (!legacyScryptMatch) return false;

	const salt = Buffer.from(legacyScryptMatch[1], "hex");
	const expectedKey = Buffer.from(legacyScryptMatch[2], "hex");
	const actualKey = await deriveLegacyKey(password, salt);

	return timingSafeEqual(actualKey, expectedKey);
}

export function needsPasswordRehash(storedHash: string): boolean {
	return storedHash.startsWith("scrypt:");
}
