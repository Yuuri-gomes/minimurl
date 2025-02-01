import { randomBytes } from "crypto";
import validateUniqueShortCode from "short-code/validate-unique-short-code.js";

export default function generateShortCode() {
  const shortCodesSet = new Set();
  const shortCodeLength = 6;
  const shortCode = randomBytes(shortCodeLength)
    .toString("base64url")
    .slice(0, shortCodeLength);

  if (validateUniqueShortCode(shortCode)) {
    shortCodesSet.add(shortCode);
  }

  console.log(Array.from(shortCodesSet));

  return Array.from(shortCodesSet);
}
