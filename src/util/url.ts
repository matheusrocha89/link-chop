import crypto from "crypto";

/**
 * Generates a unique hash for a given input string
 * @param input - the input string to hash
 * @param length - the length of the truncated hash to return
 * @returns A truncated hash string
 */
function generateUniqueHash(input: string, length: number = 8): string {
  const inputWithTimestamp = `${input}-${Date.now().toString()}`;
  const fullHash = crypto
    .createHash("sha256")
    .update(inputWithTimestamp)
    .digest("hex");

  return fullHash.slice(0, length);
}

export { generateUniqueHash };
