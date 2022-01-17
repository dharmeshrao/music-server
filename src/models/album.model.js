const mongoose = require("mongoose");
const albumSchema = mongoose.Schema({
  name: { type: String, require: true },
  genre: { type: String, require: true },
  year: { type: String, require: true },
  image: { type: String, require: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "song" }],
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "artist",
    required: true,
  },
});
// Name, Genre & Year (Can have multiple Songs)
module.exports = mongoose.model("album", albumSchema);
