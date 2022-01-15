const router = require('express').Router()
const Artist = require('../models/artist.model')
router.get('/:id' , async (req,res)=>{
    const artist = await Artist.findById(req.params.id).populate("albums")
    return res.status(200).send({artist})
})

router.patch('/:id' , async (req,res)=>{
    const artist = await Artist.findByIdAndUpdate(req.params.id,req.body,{new: true}).populate('album')
    return res.status(200).send({artist})
})
module.exports = router;