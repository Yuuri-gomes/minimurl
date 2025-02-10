import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

export default async function handlerSiteMap(request, response) {
  const links = [{ url: "/", changefreq: "daily", priority: 0.3 }];

  const stream = new SitemapStream({
    hostname: `https://${request.headers.host}`,
  });

  response.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream),
  ).then((data) => data.toString());

  response.end(xmlString);
}
