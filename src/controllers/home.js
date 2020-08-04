const { Image } = require("../models");
const ctrl = {};


ctrl.index = async (req, res) => {
  const images = await Image.find().lean({ virtuals: true }).sort({ timestamp: -1 });
  res.render("index", { images });
};

module.exports = ctrl;
