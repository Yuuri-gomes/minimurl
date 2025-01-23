import database from "infra/database.js";

test("Authenticate at DB should response successful", async () => {
  let sequelize;
  try {
    sequelize = await database.getNewClient();
    expect(sequelize).toBeInstanceOf(Object);
  } catch (error) {
    console.error(error);
    expect(error).toBeNull();
  }

  sequelize.close();
});
