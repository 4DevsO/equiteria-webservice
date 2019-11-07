const mongoose = require('mongoose');
const OilSpotModel = mongoose.model('OilSpot');

const { newSpotReport, spotUpdated, newSpotPhoto } = require('../services/oilSpotService');

module.exports = {
  list: async (req, res) => {
    const spots = await OilSpotModel.find({});

    return res.json({ success: true, data: spots });
  },

  index: async (req, res) => {
    const { oilSpotId } = req.params;

    const spot = await OilSpotModel.findOne({ __id: oilSpotId });

    return res.json({ success: true, data: spot });
  },

  store: async (req, res) => {
    const OilSpot = { ...req.body };

    try {
      const createdSpot = await newSpotReport(OilSpot);
      return res.json({ success: true, data: createdSpot });
    } catch (e) {
      res.status(400).json({ success: false, message: e.message });
      console.error(e.message);
    }
  },

  storePhoto: async (req, res) => {
    const imagesData = { ...req.files };
    try {
      const imageStored = await newSpotPhoto(imagesData);
      return res.json({ success: true, data: imageStored });
    } catch (e) {
      res.status(400).json({ success: false, message: e.message });
      console.error(e.message);
    }
  },

  update: async (req, res) => {
    const spot = { ...req.body };
    const { spotId } = req.params;

    try {
      const updatedSpot = await spotUpdated(spotId, spot);
      return res.json({ success: true, data: updatedSpot });
    } catch (e) {
      return res.json({ success: false, message: e.message });
    }
  },

  delete: async (req, res) => {
    const { spotId } = req.params;

    await OilSpotModel.findOneAndDelete({ __id: spotId });

    return res.json({ success: true });
  }
};
