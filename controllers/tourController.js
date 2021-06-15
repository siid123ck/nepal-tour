const fs = require('fs');
const Tour = require('../model/tour');
const tours =JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`, 'utf-8'))

const checkTourId = (req, res, next, value) =>{
    
}

const getAllTours = async (req, res)=>{
    try {
        const tours= await Tour.find();
            res.status(200).json({
                status:'sucess',
                result:tours.length,
                data:{tours}
            })
    } catch (error) {
        res.status(404).json({
            status:'fail',
            data:{error}
        })
    }
  
 }

 const postTour = (req, res)=>{
    const new_tour = new Tour(req.body)
    testTour.save().then(data=>console.log(data)).catch(err=>console.log(`error: ${err}`))

    tours.push(new_tour);
    fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(tours), err=>{
        res.status(201).json({
            status:'sucess',
            data:{new_tour}
        })

    })
}

const getSingleTour =  (req, res)=>{
    const tourId=req.params.id; 
    console.log(req.params)
   const tour = tours.find(item=>item._id===parseInt(tourId) )
  console.log(`tourId: ${tourId}`)
    if (!tour) {
     return  res.status(404).json({
           status:'fail', 
           result:'not data found'
       }) 
    }
    res.status(200).json({
        status:'sucess',
        result:tours.length,
        data:{tour}
    })
}

const updateTour = (req, res)=>{
    const tour = tours.find(item=>item._id===parseInt(req.params.id) )
    if (!tour) {
     return  res.status(404).json({
           status:'fail', 
           result:'not data found'
       }) 
    }
    res.status(200).json({
        status:'sucess',
        data:'data updated'
    })
};

const deleteTour =  (req, res)=>{
    const tour = tours.find(item=>item._id===parseInt(req.params.id) )
    if (!tour) {
     return  res.status(404).json({
           status:'fail', 
           result:'not data found'
       }) 
    }
    res.status(204).json({
        status:'sucess',
        data:null
    })
}


 module.exports= {getAllTours, postTour, getSingleTour, updateTour, deleteTour};
