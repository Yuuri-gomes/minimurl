import generateShortCode from "short-code/generate-short-code";
import insertShortenedUrl from "short-code/insert-shortened-url";

export default async function createShortenedUrl(originalUrl) {
  const shortCode = await generateShortCode();
  try {
    await insertShortenedUrl(originalUrl, shortCode);
  } catch (error) {
    console.error(error);
  }
}
