import { createRouter } from "next-connect";
import controller from "infra/controller";
import UrlShortenerDao from "dao/url-shortener-dao";
import { BadRequestError } from "infra/errors";

const router = createRouter();
router.get(handlerUrlCounterClicks);

export default router.handler(controller.errorHandlers);

async function handlerUrlCounterClicks(request, response) {
  const { shortUrl } = request.query;
  if (await notExistShortUrl(shortUrl)) throw new BadRequestError();
  const urlClicksQtd = await UrlShortenerDao.getUrlClicksCounter(shortUrl);

  return response
    .status(200)
    .json({ clicks: urlClicksQtd[0].dataValues.visit_url_count });
}

async function notExistShortUrl(shortUrl) {
  console.log(shortUrl);

  return (
    !shortUrl || (await UrlShortenerDao.checkIfNotExistShortCode(shortUrl))
  );
}
