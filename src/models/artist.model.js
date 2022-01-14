const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const artistSchema = mongoose.Schema({
  name: { type: String, require: true },
  coverPhoto: { type: String },
  password: { type: String, require: true },
  email: { type: String, require: true },
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "album" }],
});

artistSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const hash = bcryptjs.hashSync(this.password, 8);
  this.password = hash;
  return next();
});
artistSchema.methods.checkPassword = function (password) {
  const match = bcryptjs.compareSync(password, this.password);
  return match;
};

module.exports = mongoose.model("artist", artistSchema);
// Name, Genre & Year (Can have multiple Songs)
