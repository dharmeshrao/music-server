const express = require("express");
const albumController = require("./controllers/album.controller");
const artistController = require("./controllers/artist.controller");
const songController = require("./controllers/song.controller");
const { registor, login } = require("./controllers/auth.controller");
const app = express();
app.use(express.json());
app.post("/login", login);
app.post("/register", registor);
app.use("/artists", artistController);
app.use("/songs", songController);
app.use("/albums", albumController);
module.exports = app;
