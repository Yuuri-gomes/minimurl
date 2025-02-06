import orchestrator from "tests/orchestrator";

const originalUrlMock = { original_url: "https://github.com" };
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
  test("Should create and shorten a URL and then resolve it correctly", async () => {
    const createUrlResponse = await fetch(
      "http://localhost:3000/api/v1/shortener/create",
      createUrlFetchConfigs,
    );
    expect(createUrlResponse.status).toBe(201);
    const responseBody = await createUrlResponse.json();
    const { original_url, short_code } = responseBody;
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
});
