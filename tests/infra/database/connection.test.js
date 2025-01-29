import database from "infra/database.js";

test("Authenticate at DB should response successful", async () => {
  let sequelize;
  sequelize = await database.getNewClient();
  expect(sequelize).toBeInstanceOf(Object);
  sequelize.close();
});
