import { randomBytes } from "crypto";
import UrlShortenerDAO from "dao/url-shortener-dao";

export default async function generateShortCode() {
  const shortCodeLength = 6;
  const shortCode = randomBytes(shortCodeLength)
    .toString("base64url")
    .slice(0, shortCodeLength);

  if (UrlShortenerDAO.checkIfNotExistShortCode(shortCode)) {
    return shortCode;
  }

  generateShortCode();
}
