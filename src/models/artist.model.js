const mongoose = require("mongoose");
const artistSchema = mongoose.Schema({
  name: { type: String, require: true },
  coverPhoto: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true },
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "album" }],
});
module.exports = mongoose.model("artist", artistSchema);
// Name, Genre & Year (Can have multiple Songs)
