const express = require('express');
const route = express.Router();

const PinRoute = require('./pin');

route.get('/', (req, res) => {
  res.json({ success: true });
});

route.get('/pin', PinRoute.list);
route.get('/pin/:pinId', PinRoute.index);
route.post('/pin', PinRoute.store);
route.put('/pin/:pinId', PinRoute.update);
route.delete('/pin/:pinId', PinRoute.delete);

module.exports = route;
