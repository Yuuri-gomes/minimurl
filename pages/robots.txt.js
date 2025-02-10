export default function handlerRobots(request, response) {
  const siteUrl = "https://minimurl.com.br";
  const robots = `User-agent: *
  Allow: /
  Sitemap: ${siteUrl}/sitemap.xml`;
  response.setHeader("Content-Type", "text/plain");
  response.write(robots);
  response.end();
}
