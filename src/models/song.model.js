const mongoose = require("mongoose");
const songSchema = mongoose.Schema({
  name: { type: String, require: true },
  duration: { type: String || Number, require: true },
  album: { type: mongoose.Schema.Types.ObjectId, ref: "album", required: true },
});
module.exports = mongoose.model("song", songSchema);
