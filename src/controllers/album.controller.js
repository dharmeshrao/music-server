const router = require("express").Router();
const Album = require("../models/album.model");
router.post("/", async (req, res) => {
  const album = await Album.create(req.body);
  return res.status(200).send({ album });
});

router.get("/data", async (req, res) => {
  let page = req.query.page || 1;
  let limit = req.query.limit || 8;
  let formula = (page - 1) * limit;
  let q = req.query.year;
  let c = req.query.genre;
  let queryGenre = new RegExp(c, "i");
  let queryYear = new RegExp(q, "i");
  const album = await Album.find({
    year: { $regex: queryYear },
    genre: { $regex: queryGenre },
  })
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
  const totalPage = await Album.find({
    year: { $regex: queryYear },
    genre: { $regex: queryGenre },
  }).countDocuments();
  const showAll = Math.ceil(totalPage / limit);
  return res.status(200).send({ album, showAll });
});

router.get("/search", async (req, res) => {
  let q = req.query.q;
  let queryYear = new RegExp(q, "i");
  const album = await Album.find({
    name: { $regex: queryYear },
  });
  return res.status(200).send({ album });
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
