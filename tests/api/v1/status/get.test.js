import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  test("Retrieving current system status", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parseUpdatedAt);

    expect(responseBody.dependencies.database.version).toEqual("8.0.32");
    expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(100);
    expect(responseBody.dependencies.database.opened_connections).toEqual(1);
  });
});