import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const firstResponse = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(firstResponse.status).toBe(201);

        const firtResponseBody = await firstResponse.json();

        expect(Array.isArray(firtResponseBody.migrations)).toBe(true);
        expect(firtResponseBody.migrations.length).toBeGreaterThan(0);
      });
      test("For the second time", async () => {
        const secondResponse = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(secondResponse.status).toBe(200);

        const secondResponseBody = await secondResponse.json();

        expect(Array.isArray(secondResponseBody.migrations)).toBe(true);
        expect(secondResponseBody.migrations.length).toBe(0);
      });
    });
  });
});
