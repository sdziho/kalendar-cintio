const router = require("express").Router();

const { userLogin, allUsers, userRegister } = require("../utils/Auth");

router.get("/", async (req, res) => {
  return allUsers(req, res);
});

router.post("/login", async (req, res) => {
  await userLogin(req, res);
});
router.post("/register", async (req, res) => {
  await userRegister(req, res);
});

module.exports = router;
