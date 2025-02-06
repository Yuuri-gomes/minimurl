import generateShortCode from "short-code/generate-short-code";
import UrlShortenerDAO from "dao/url-shortener-dao";

export default async function createShortenedUrl(original_url) {
  const short_code = await generateShortCode();
  try {
    return await UrlShortenerDAO.create({ original_url, short_code });
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}
