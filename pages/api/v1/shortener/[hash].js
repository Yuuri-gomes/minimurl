import { createRouter } from "next-connect";
import controller from "infra/controller";

const router = createRouter();

router.get(handlerOriginalUrlByShorCode);

export default router.handler(controller.errorHandlers);

async function handlerOriginalUrlByShorCode(request, response) {
  const linksDB = {
    abc123: "https://google.com",
    xyz789: "https://github.com",
  };

  const { hash } = request.query;

  if (!hash || !linksDB[hash]) {
    return response.status(404).json({ error: "Hash não encontrada" });
  }

  response.status(200).json({ originalUrl: linksDB[hash] });
}
