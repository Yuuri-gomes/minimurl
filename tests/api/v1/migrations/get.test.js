import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET /api/v1/migrations", () => {
  test("Retrieving pending migrations", async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/migrations");

      console.log("Eu sou o respoons ", response)
    } catch (error) {
      console.error(error);

    }
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
  });
});