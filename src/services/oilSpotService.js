const mongoose = require('mongoose');
const { compressImage } = require('../handlers/sharp');

const OilSpot = mongoose.model('OilSpot');

module.exports = {

  newSpotReport: async spot => {
    if (await OilSpot.findOne({ spot_id: spot.spot_id })) {
      throw new Error(`There's already a spot with this ID`);
    }
    const {
      spot_id,
      user_id,
      collect_date,
      location: { latitude, longitude },
      tags,
      photos
    } = spot;

    const spotLocation = { type: 'Point', coordinates: [longitude, latitude] };

    try {
      const createdSpot = new OilSpot({
        spot_id,
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

  newSpotPhoto: async (imagesData) => {
    try {
      const imagesName = compressImage(imagesData);
      return imagesName;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  updateSpot: async (spotId, spot) => {
    const {
      spot_id,
      location: { latitude, longitude }
    } = spot;

    if (spot_id && spot_id !== spotId) {
      throw new Error(`You can't change the id`);
    }
    if (spot.location) {
      spot.location = { type: 'Point', coordinates: [longitude, latitude] };
    }
    try {
      const updatedSpot = await OilSpot.findOneAndUpdate({ spot_id: spotId }, spot, { new: true });
      if (!updatedSpot) {
        throw new Error(`User not found`);
      }
      return updatedSpot;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
};
