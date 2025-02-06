import { createRouter } from "next-connect";
import controller from "infra/controller";
import { BadRequestError } from "infra/errors";
import UrlShortenerDao from "dao/url-shortener-dao";
import { Sequelize } from "sequelize";

const router = createRouter();

router.get(handlerOriginalUrlByShorCode);

export default router.handler(controller.errorHandlers);

async function handlerOriginalUrlByShorCode(request, response) {
  const { hash } = request.query;

  if (await notExistHash(hash)) throw new BadRequestError();
  const { original_url } =
    await UrlShortenerDao.getOriginalUrlByShortCode(hash);
  await UrlShortenerDao.update(hash, {
    visit_url_count: Sequelize.literal("visit_url_count + 1"),
    last_visit_url: Sequelize.literal("CURRENT_TIMESTAMP"),
  });

  response.status(200).json({ original_url });
}

async function notExistHash(hash) {
  return !hash || (await UrlShortenerDao.checkIfNotExistShortCode(hash));
}
