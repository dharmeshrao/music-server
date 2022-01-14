const router = require("express").Router();
const Album = require("../models/album.model");
router.post("/", async (req, res) => {
  const album = await Album.create(req.body);
  return res.status(200).send({ album });
});

router.get("/", async (req, res) => {
  const album = await Album.find().populate({
    path: "artist",
    select: ["name","coverPhoto"]
  }).populate({
    path: "songs",
    select: ["name", "duration"]
  });
  return res.status(200).send({ album });
});
router.get("/:id", async (req, res) => {
  const album = await Album.findById(req.params.id).populate("songs").populate({
    path: "artist",
    select: ["name","coverPhoto"]
  });
  return res.status(200).send({ album });
});

router.patch("/:id", async (req, res) => {
  const album = await Album.findByIdAndUpdate(req.params.id,req.body,{new: true})
  return res.status(200).send({ album });
});

module.exports = router;
