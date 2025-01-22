import sequelize from "infra/database.js";

test("Authenticate at DB should response successful", async () => {
  try {
    const response = await sequelize.authenticate();
    expect(response).toBeUndefined();
  } catch (error) {
    expect(error).toBeNull();
  }

  sequelize.close();
});
