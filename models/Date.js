const mongoose = require("mongoose");

const DateSchema = new mongoose.Schema(
  {
    dates: {
      type: [
        {
          startDate: String,
          endDate: String,
        },
      ],
      required: true,
    },
    freeDays: { type: Number, required: true },
    userID: { type: String, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("dates", DateSchema);
