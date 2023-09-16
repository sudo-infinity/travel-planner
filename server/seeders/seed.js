const db = require("../src/config/connection");
const { User } = require("../src/models");
const userSeeds = require("./userSeeds.json");

db.once("open", async () => {
  await User.deleteMany({});
  await User.create(userSeeds);

  console.log("Seed users created!");
  process.exit(0);
});
