import * as prismic from "@prismicio/client";
import { asText, asHTML } from "@prismicio/helpers";

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_REPO_NAME;

export const client = prismic.createClient(repositoryName, {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  defaultParams: {
    fetchLinks: ["post.title", "post.subtitle"],
  },
});

// Retorna Rich Text como HTML formatado
export function toHtml(richTextField) {
  return asHTML(richTextField);
}

// ✅ Adicione essa função para retornar texto simples
export function toPlainText(richTextField) {
  return asText(richTextField);
}
