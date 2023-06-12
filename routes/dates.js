const router = require("express").Router();

const { setDates, getDates } = require("../utils/Dates");
const { userAuth } = require("../utils/Auth");

router.post("/set-dates", userAuth, async (req, res) => {
  await setDates(req, res);
});
router.get("/get-dates", userAuth, async (req, res) => {
  await getDates(req, res);
});

module.exports = router;
