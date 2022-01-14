const mongoose = require("mongoose");
const songSchema = mongoose.Schema({
  name: { type: String, require: true },
  duration: { type: Number, require: true },
  album: { type: mongoose.Schema.Types.ObjectId, ref: "album", required: true },
});
module.exports = mongoose.model("song", songSchema);
