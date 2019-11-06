const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  res.json({ success: true });
});

route.get("/pin", require("./pin").list);
route.get("/pin/:pinId", require("./pin").index);
route.post("/pin", require("./pin").store);
route.put("/pin/:pinId", require("./pin").update);
route.delete("/pin/:pinId", require("./pin").delete);

module.exports = route;
