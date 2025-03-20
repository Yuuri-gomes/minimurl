import { createRouter } from "next-connect";
import controller from "infra/controller";
import UrlShortenerDao from "dao/url-shortener-dao";
import { BadRequestError } from "infra/errors";
import notExistShortCode from "services/short-code/not-exist-short-code";

const router = createRouter();
router.get(handlerUrlCounterClicks);

export default router.handler(controller.errorHandlers);

async function handlerUrlCounterClicks(request, response) {
  const { short_url } = request.query;
  if (await notExistShortCode(short_url)) throw new BadRequestError();
  const urlClicksQtd = await UrlShortenerDao.getUrlClicksCounter(short_url);

  return response
    .status(200)
    .json({ clicks: urlClicksQtd[0].dataValues.visit_url_count });
}
