const express = require('express');
const router = express.Router();

const { getAllTours, postTour, getSingleTour, updateTour, deleteTour, aliasTopTours } = require('../controllers/tourController');


//get top tours
router.route('/api/tours/top-tours').get(aliasTopTours, getAllTours)


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