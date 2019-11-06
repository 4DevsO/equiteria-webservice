const mongoose = require('mongoose');
const { ValidationException } = require('../handlers/exceptionHandlers');
const { compressImage } = require('../handlers/sharp');

const OilSpot = mongoose.model('OilSpot');

module.exports = {

  newSpotReport: async spot => {
    const {
      __id,
      user_id,
      collect_date,
      location: { latitude, longitude },
      tags,
      photos
    } = spot;

    const spotLocation = { type: 'Point', coordinates: [longitude, latitude] };

    try {
      const createdSpot = new OilSpot({
        __id,
        user_id,
        collect_date,
        location: spotLocation,
        tags,
        photos
      });
      await createdSpot.save();
      return createdSpot;
    } catch (e) {
      console.error(e.message);
      throw e;
    }
  },

  newSpotPhoto: async (imageData) => {
    try {
      compressImage(imageData);
      return imageData.filename;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  updateSpot: async (spotId, spot) => {
    try {
      const updatedSpot = await OilSpot.findOneAndUpdate({ __id: spotId }, spot, { new: true });
      return updatedSpot;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};
