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
const deleteDates = async (req, res) => {
  try {
    const user = serializeUser(req.user);
    //const dates = await Date.findOne({ userID: user._id });
    const myDates = await Date.findOne({ userID: user._id });

    let exists = myDates.dates.some((obj) => {
      return obj._id == req.body._id;
    });

    const daysLeft = myDates.freeDays + req.body.deletedDates;
    if (exists) {
      await Date.findOneAndUpdate(
        { userID: user._id },
        {
          $pull: { dates: { _id: req.body._id } },
          $set: { freeDays: daysLeft },
        },
        { returnOriginal: false }
      );
      return res.status(201).json({
        message: "Dates successfully deleted.",
        success: true,
      });
    } else {
      return res.status(500).json({
        message: "ID doesn't exists",
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

module.exports = {
  setDates,
  getDates,
  deleteDates,
};
