import { randomBytes } from "crypto";
import validateUniqueShortCode from "short-code/validate-unique-short-code.js";

export default async function generateShortCode() {
  const shortCodeLength = 6;
  const shortCode = randomBytes(shortCodeLength)
    .toString("base64url")
    .slice(0, shortCodeLength);

  if (await validateUniqueShortCode(shortCode)) {
    console.log(shortCode);

    return shortCode;
  }

  generateShortCode();
}
