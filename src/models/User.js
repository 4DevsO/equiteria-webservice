const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
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
