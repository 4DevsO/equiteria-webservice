const mongoose = require('mongoose');
const OilSpotModel = mongoose.model('OilSpot');

const { newSpotReport, updateSpot, newSpotPhoto } = require('../services/oilSpotService');

module.exports = {
  list: async (req, res) => {
    const spots = await OilSpotModel.find({});

    return res.json({ success: true, data: spots });
  },

  index: async (req, res) => {
    const { oilSpotId } = req.params;

    const spot = await OilSpotModel.findOne({ spot_id: oilSpotId });

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
    const { oilSpotId } = req.params;

    try {
      const updatedSpot = await updateSpot(oilSpotId, spot);
      return res.json({ success: true, data: updatedSpot });
    } catch (e) {
      console.error(e);
      return res.json({ success: false, message: e.message });
    }
  },

  delete: async (req, res) => {
    const { oilSpotId } = req.params;

    try {
      await OilSpotModel.findOneAndRemove({ spot_id: oilSpotId });
      return res.json({ success: true });
    } catch (e) {
      console.error(e);
      return res.json({ success: false });
    }
  }
};
