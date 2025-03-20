import { createRouter } from "next-connect";
import controller from "infra/controller";
import createShortenedUrl from "services/short-code/create-shortened-url";
import { BadRequestError } from "infra/errors";

const router = createRouter();

router.post(createShortCode);

export default router.handler(controller.errorHandlers);

async function createShortCode(request, response) {
  const { original_url } = request.body;
  if (!original_url) throw new BadRequestError();
  const responseCreateShortCode = await createShortenedUrl(original_url);

  return response.status(201).json(responseCreateShortCode);
}
