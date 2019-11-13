const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    phone_number: {
      type: String,
      trim: true,
      index: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      max: 128,
      min: 6
    },
    name: {
      type: String,
      trim: true,
      max: 128,
      min: 6
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
