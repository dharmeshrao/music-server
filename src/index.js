const express = require("express");
// const albumController = require("./controllers/album.controller");
const songController = require("./controllers/song.controller");
const app = express();
app.use(express.json());
app.use("/songs", songController);
module.exports = app;
