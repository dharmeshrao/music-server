const mongoose = require("mongoose");
const artistSchema = mongoose.Schema({
  name: { type: String, require: true },
  coverPhoto: { type: String, require: true },
  password: { type: String, require: true },
  email : { type: String, require: true }
});
module.exports = mongoose.model("artist", artistSchema);
// Name, Genre & Year (Can have multiple Songs)
