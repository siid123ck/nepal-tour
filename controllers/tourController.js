const fs = require('fs');
const tours =JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`, 'utf-8'))

const checkTourId = (req, res, next, value) =>{
    
}

const getAllTours = (req, res)=>{
        res.status(200).json({
            status:'sucess',
            result:tours.length,
            data:{tours}
        })
 }

 const postTour = (req, res)=>{
    const tourId = tours[tours.length-1]._id + 1;
    console.log(tourId)
    const new_tour = Object.assign({_id:tourId}, req.body)
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
