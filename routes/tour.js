const express = require('express');
const router = express.Router();
const fs = require('fs');
const tours =JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`, 'utf-8'))

const { getAllTours, postTour, getSingleTour, updateTour, deleteTour } = require('../controllers/tourController');

tours.map((item, index)=> item._id=index+1)
const tourId = tours[tours.length-1]._id + 1;
console.log(tourId)

router.param('id', (req, res, next, value)=>{
    console.log(`tourId is ${value}`);
    next();
})

router.route('/').get(getAllTours)
.post(postTour);

router.route('/:id').get(getSingleTour)
.patch(updateTour)
.delete(deleteTour);

module.exports= router;