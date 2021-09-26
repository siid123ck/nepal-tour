const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const reviewRoute = require('./review')

const { getAllTours, postTour, getSingleTour, updateTour, deleteTour} = require('../controllers/tourController');


//get top tours
// router.route('/api/tours/top-tours').get(aliasTopTours, getAllTours)

router.use('/:tourId/reviews', reviewRoute)

router.route('/')
.get(authController.protect, getAllTours)
.post(postTour);

router.route('/:id')
.get(getSingleTour)
.patch(updateTour)
.delete(authController.protect, authController.restrictTo('admin', 'guide-lead'), deleteTour);



// router.param('id', (req, res, next, value)=>{
//     console.log(`tourId is ${value}`);
//     next();
// })

module.exports= router;