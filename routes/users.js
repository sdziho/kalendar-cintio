const router = require("express").Router();

const {
  userLogin,
  allUsers,
  userRegister,
  userAuth,
  getUserInfo,
} = require("../utils/Auth");

router.get("/",userAuth, async (req, res) => {
  return allUsers(req, res);
});

router.post("/login", async (req, res) => {
  await userLogin(req, res);
});
router.post("/register", async (req, res) => {
  await userRegister(req, res);
});
router.get("/info", userAuth, async (req, res) => {
  await getUserInfo(req, res);
});

module.exports = router;
