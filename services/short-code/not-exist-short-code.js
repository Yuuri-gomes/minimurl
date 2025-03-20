import UrlShortenerDao from "dao/url-shortener-dao";

export default async function notExistShortCode(shortCode) {
  return (
    !shortCode || (await UrlShortenerDao.checkIfNotExistShortCode(shortCode))
  );
}
