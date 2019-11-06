const express = require('express');
const route = express.Router();

const OilSpotRoute = require('./oilSpotController');

route.get('/', (req, res) => {
  res.json({ success: true });
});

route.get('/oilSpot', OilSpotRoute.list);
route.get('/oilSpot/:oilSpotId', OilSpotRoute.index);
route.post('/oilSpot', OilSpotRoute.store);
route.put('/oilSpot/:oilSpotId', OilSpotRoute.update);
route.delete('/oilSpot/:oilSpotId', OilSpotRoute.delete);

module.exports = route;
