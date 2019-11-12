const mongoose = require('mongoose');

const OilSpotSchema = new mongoose.Schema(
  {
    spot_id: { type: String, required: true, index: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    collect_date: { type: Date, required: true },
    active: { type: Boolean, default: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    tags: [String],
    description: {
      type: String
    },
    other_description: {
      type: String
    },
    photos: [String]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('OilSpot', OilSpotSchema);
