import UrlShortenerDAO from "dao/url-shortener-dao";

export default async function unshortenURLByShortCode(short_url) {
  try {
    return await UrlShortenerDAO.getOriginalUrlByShortCode(short_url);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
