import { createRouter } from "next-connect";
import controller from "infra/controller";
import unshortenURLByShortCode from "services/original-url/unshorten-url";
import notExistShortCode from "services/short-code/not-exist-short-code";
import { BadRequestError } from "infra/errors";

const router = createRouter();

router.get(unshortenURL);

export default router.handler(controller.errorHandlers);

async function unshortenURL(request, response) {
  const { short_url } = request.query;

  if (await notExistShortCode(short_url))
    throw new BadRequestError(
      `the following shortcode doesn´t exists: ${short_url}!`,
    );
  const responseOriginalURL = await unshortenURLByShortCode(short_url);

  return response.status(200).json(responseOriginalURL[0]);
}
