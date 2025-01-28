import database from "infra/database";
import { randomBytes } from "crypto";

async function generateBulkShortCodes(totalCodes, length = 6) {
  const codes = new Set();
  while (codes.size < totalCodes) {
    const code = randomBytes(length).toString("base64url").slice(0, length);
    codes.add(code);
  }
  return Array.from(codes);
}

async function insertUrl(shortCode, originalUrl) {
  const query =
    "INSERT INTO url_shortener (short_code, original_url) VALUES (?, ?)";
  try {
    await database.doQuery(query, { replacements: [shortCode, originalUrl] });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return false;
    }
    throw err;
  }
  return true;
}

async function batchInsertUrls(batch) {
  const placeholders = batch.map(() => "(?, ?)").join(", ");
  const values = batch.flat();
  const query = `INSERT INTO url_shortener (short_code, original_url) VALUES ${placeholders}`;
  try {
    await database.doQuery(query, { replacements: values });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      console.error("Collision detected during batch insert");
    } else {
      throw err;
    }
  }
}

async function stressTest(totalUrls = 199_118_593, batchSize = 10_000) {
  console.time("Stress Test");

  for (let i = 0; i < totalUrls; i += batchSize) {
    const codes = await generateBulkShortCodes(batchSize);
    const batch = codes.map((shortCode, index) => [
      shortCode,
      `https://example.com/${i + index}`,
    ]);

    try {
      await batchInsertUrls(batch);
    } catch (err) {
      console.error("Error during batch insert:", err);
    }

    if ((i + batchSize) % 1_000_000 === 0) {
      console.log(`Processed ${i + batchSize} URLs`);
    }
  }

  console.timeEnd("Stress Test");
}

stressTest();
