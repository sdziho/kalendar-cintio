const Date = require("../models/Date");
const { serializeUser } = require("../utils/Auth");

const setDates = async (req, res) => {
  try {
    const user = serializeUser(req.user);
    const dates = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    };
    const myDates = await Date.findOne({ userID: user._id });
    const daysLeft = myDates.freeDays - req.body.usedDays;
    if (daysLeft > 0) {
      await Date.findOneAndUpdate(
        { userID: user._id },
        {
          $push: { dates: dates },
          $set: { freeDays: daysLeft },
        },
        { returnOriginal: false }
      );
      return res.status(201).json({
        message: "Dates successfully added.",
        success: true,
      });
    } else {
      return res.status(500).json({
        message: "No more free days",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};
const getDates = async (req, res) => {
  try {
    const user = serializeUser(req.user);
    const dates = await Date.findOne({ userID: user._id });
    return res.status(200).json(dates);
  } catch (err) {
    return res.status(500).json({
      message: "Unable To Finish",
      success: false,
    });
  }
};

module.exports = {
  setDates,
  getDates,
};
