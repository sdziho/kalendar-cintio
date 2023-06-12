const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: false },
  },
  { versionKey: false }
);

module.exports = mongoose.model("cintiousers", UserSchema);
