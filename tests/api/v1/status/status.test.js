import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  test("Retrieving current system status", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    const dependenciesDatabase = responseBody.dependencies.database;

    const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parseUpdatedAt);

    expect(dependenciesDatabase.version).toContain("8.0");
    expect(dependenciesDatabase.max_connections).toBeGreaterThan(100);
  });
});
