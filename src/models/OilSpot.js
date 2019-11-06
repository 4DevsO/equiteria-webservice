const mongoose = require('mongoose');

const OilSpotSchema = new mongoose.Schema(
  {
    __id: { type: String, required: true, index: true },
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
    photos: [
      {
        key: String,
        name: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('OilSpot', OilSpotSchema);
