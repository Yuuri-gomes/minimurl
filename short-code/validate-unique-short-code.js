import database from "infra/database";

export default async function validateUniqueShortCode(shortCode) {
  const checkUniqueShortCodeQuery =
    "SELECT COUNT(short_code) FROM url_shortener WHERE short_code = ?";
  const resultQuery = await database.doQuery(checkUniqueShortCodeQuery, {
    replacements: [shortCode],
  });

  return !resultQuery[0].count > 0;
}
