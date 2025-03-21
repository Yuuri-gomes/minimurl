import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export default async function handler(req, res) {
  try {
    const siteUrl = "https://minimurl.com.br"; // Substitua pelo seu domínio real

    // Lista de páginas estáticas do seu encurtador de URL
    const links = [
      { url: "/", changefreq: "daily", priority: 1.0 }, // Página principal
      { url: "/url-counter", changefreq: "daily", priority: 0.9 }, // Contador de cliques
      { url: "/terms", changefreq: "yearly", priority: 0.3 }, // Termos de uso
      { url: "/denounce", changefreq: "monthly", priority: 0.5 }, // Formulário de denúncia
      { url: "/unshorten", changefreq: "daily", priority: 0.8 }, // Página para desencurtar links
    ];

    // Criando o Sitemap XML
    const stream = new SitemapStream({ hostname: siteUrl });

    res.setHeader("Content-Type", "application/xml");

    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream),
    ).then((data) => data.toString());

    res.status(200).end(xmlString);
  } catch (error) {
    console.error("Erro ao gerar sitemap:", error);
    res.status(500).end();
  }
}
