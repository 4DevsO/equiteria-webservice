const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    colect_date: { type: Date, required: true },
    active: { type: Boolean, default: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Pin", PinSchema);
