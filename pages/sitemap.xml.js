export default async function handlerSiteMap(request, response) {
  const siteUrl = "https://minimurl.com.br";
  const pages = ["/"];

  const siteMap = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map((page) => {
        return `
        <url>
          <loc>${siteUrl}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>${page === "/" ? "1.0" : "0.8"}</priority>
        </url>`;
      })
      .join("")}
  </urlset>`;

  response.setHeader("Content-Type", "text/xml");
  response.write(siteMap);
  response.end();
}
