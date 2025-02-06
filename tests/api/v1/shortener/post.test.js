import orchestrator from "tests/orchestrator";

const originalUrlMock = { original_url: "https://github.com" };

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
});

describe("POST /api/v1/shortener/create", () => {
  test("Should create a url_shortener register", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/shortener/create",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(originalUrlMock),
      },
    );

    expect(response.status).toBe(201);
    const responseBody = await response.json();
    const { original_url, short_code } = responseBody;
    expect(responseBody).toHaveProperty("original_url");
    expect(responseBody).toHaveProperty("short_code");
    expect(original_url).toEqual(originalUrlMock["original_url"]);
    expect(short_code).toHaveLength(6);
  });
});
