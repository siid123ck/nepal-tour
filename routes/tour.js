const express = require('express');
const router = express.Router();

const { getAllTours, postTour, getSingleTour, updateTour, deleteTour } = require('../controllers/tourController');





router.route('/').get(getAllTours)
.post(postTour);

router.route('/:id').get(getSingleTour)
.patch(updateTour)
.delete(deleteTour);

router.param('id', (req, res, next, value)=>{
    console.log(`tourId is ${value}`);
    next();
})

module.exports= router;