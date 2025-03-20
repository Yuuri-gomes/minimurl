import orchestrator from "tests/orchestrator";

const originalUrlMock = { original_url: "https://github.com" };
let shortUrl;
let originalUrl;
const createUrlFetchConfigs = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(originalUrlMock),
};

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
});

describe("Integration Tests - /api/v1/shortener", () => {
  it("Should create and shorten a URL and then resolve it correctly", async () => {
    const createUrlResponse = await fetch(
      "http://localhost:3000/api/v1/shortener/create",
      createUrlFetchConfigs,
    );
    expect(createUrlResponse.status).toBe(201);
    const responseBody = await createUrlResponse.json();
    const { original_url, short_code } = responseBody;
    shortUrl = short_code;
    originalUrl = original_url;

    expect(responseBody).toHaveProperty("original_url");
    expect(responseBody).toHaveProperty("short_code");
    expect(original_url).toEqual(originalUrlMock["original_url"]);
    expect(short_code).toHaveLength(6);

    const getOriginalUrlByHashResponse = await fetch(
      `http://localhost:3000/api/v1/shortener/${short_code}`,
    );

    expect(getOriginalUrlByHashResponse.status).toBe(200);
    const getOriginalUrlByHashResponseBody =
      await getOriginalUrlByHashResponse.json();

    expect(getOriginalUrlByHashResponseBody["original_url"]).toEqual(
      originalUrlMock["original_url"],
    );
  });

  it("Should return counter clicks when the URL exists", async () => {
    const clicksQuantityResponse = await fetch(
      `http://localhost:3000/api/v1/shortener/clicks-counter?short_url=${shortUrl}`,
    );

    const clicksQuantiy = await clicksQuantityResponse.json();
    expect(clicksQuantityResponse.status).toBe(200);
    expect(clicksQuantiy.clicks).toEqual(1);
  });

  it("Should return `originalURL` by `shortenedURL`", async () => {
    const getOriginalURLbyShortened = await fetch(
      `http://localhost:3000/api/v1/shortener/unshorten-url?short_url=${shortUrl}`,
    );

    const getOriginalURLbyShortenedResponse =
      await getOriginalURLbyShortened.json();

    expect(getOriginalURLbyShortened.status).toBe(200);
    expect(getOriginalURLbyShortenedResponse.original_url).toEqual(originalUrl);
  });

  it("Should return 400 when URL is not found", async () => {
    shortUrl = "notFound";
    const clicksQuantityResponse = await fetch(
      `http://localhost:3000/api/v1/shortener/clicks-counter?shortUrl=${shortUrl}`,
    );

    expect(clicksQuantityResponse.status).toBe(400);
  });
});
