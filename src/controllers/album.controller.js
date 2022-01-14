const router = require("express").Router();
const Album = require("../models/album.model");
router.post("/", async (req, res) => {
  const album = await Album.create(req.body);
  return res.status(200).send({ album });
});

router.get("/", async (req, res) => {
  let page = req.query.page || 1;
  let limit = req.query.limit || 5;
  let formula = (page - 1) * limit;
  const album = await Album.find()
    .skip(formula)
    .limit(limit)
    .populate({
      path: "artist",
      select: ["name", "coverPhoto"],
    })
    .populate({
      path: "songs",
      select: "name duration",
    });
  const totalPage = await Album.find().countDocuments();
  const showAll = Math.ceil(totalPage / limit);

  return res.status(200).send({ album, showAll });
});
router.get("/:id", async (req, res) => {
  const album = await Album.findById(req.params.id).populate("songs").populate({
    path: "artist",
    select: "name coverPhoto",
  });
  return res.status(200).send({ album });
});

router.patch("/:id", async (req, res) => {
  const album = await Album.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).send({ album });
});

module.exports = router;
