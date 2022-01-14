const router = require('express').Router();
const Song = require('../models/song.model')
router.post('/',async (req,res)=>{
  const song = await Song.create(req.body)
  return res.status(200).send({song})
})
router.get('/' , async (req,res)=>{
    const song = await Song.find().populate('album').lean().exec();
    return res.status(200).send({song})
})
module.exports = router;