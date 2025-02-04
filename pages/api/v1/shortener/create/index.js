import { createRouter } from "next-connect";
import controller from "infra/controller";
import createShortenedUrl from "short-code/create-shortened-url";

const router = createRouter();

router.post(createShortCode);

export default router.handler(controller.errorHandlers);

async function createShortCode(request, response) {
  const { original_url } = request.body;
  if (original_url === undefined || original_url === "")
    console.log(original_url);

  return response.json({});
  const responseCreateShortCode = await createShortenedUrl(original_url);
}
