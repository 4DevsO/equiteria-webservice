const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  res.json({ success: true });
});

route.get("/pin", require("./pin").index);
route.post("/pin", require("./pin").store);
route.put("/:pinId", require("./pin").update);
route.delete("/:pinId", require("./pin").delete);

module.exports = route;
