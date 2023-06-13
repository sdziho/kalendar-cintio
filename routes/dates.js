const router = require("express").Router();

const { setDates, getDates, deleteDates } = require("../utils/Dates");
const { userAuth } = require("../utils/Auth");

router.post("/set-dates", userAuth, async (req, res) => {
  await setDates(req, res);
});
router.get("/get-dates", userAuth, async (req, res) => {
  await getDates(req, res);
});
router.post("/delete-dates", userAuth, async (req, res) => {
  await deleteDates(req, res);
});

module.exports = router;
