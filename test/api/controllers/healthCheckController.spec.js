const { getHealthCheck } = require("../../../src/api/controllers/healthCheckController");

describe("Health Check Controller", () => {
  it("Health check", async () => {
    const healthCheckRes = await getHealthCheck();
    expect(healthCheckRes.data).toEqual("OK");
  });
});
