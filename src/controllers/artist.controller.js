const router = require('express').Router()
const Artist = require('../models/artist.model')
router.post('/' , async (req,res)=>{
    const artist = await Artist.create(req.body)
    return res.status(200).send({artist})
})
router.get('/' , async (req,res)=>{
    const artist = await Artist.find()
    return res.status(200).send({artist})
})
router.get('/:id' , async (req,res)=>{
    const artist = await Artist.findById(req.params.id).populate("albums")
    return res.status(200).send({artist})
})

router.patch('/:id' , async (req,res)=>{
    const artist = await Artist.findByIdAndUpdate(req.params.id,req.body,{new: true})
    return res.status(200).send({artist})
})
module.exports = router;