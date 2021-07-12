const fs = require('fs');
const Tour = require('../model/tour');

const checkTourId = (req, res, next, value) =>{
    
}

// const aliasTopTours =  (req, res, next)=>{
// console.log('middleware used');
// next()
// }

class APIFeature {
    constructor(query, queryString){
        this.query = query;
        this.queryString=queryString;
    }

    filter(){
        const queryObj = {...this.queryString};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el=>delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq|ni)\b/g, match=>`$${match}`)
        console.log(JSON.parse(queryStr))
         this.query=  this.query.find(JSON.parse(queryStr)) 
         return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }
        return this;
    }

    limit(){
        if(this.queryString.limit){
            console.log('limit', this.queryString.limit)
            this.query = this.query.limit(parseInt(this.queryString.limit))
        }
        return this;
    }

    limitFields(){
        if(this.queryString.fields){
            const fieldsLimited = this.queryString.fields.split(',').join(' ')
            console.log(fieldsLimited)
            this.query = this.query.select(fieldsLimited)
        } 
        else this.query = this.query.select("-__v")
        return this;
    }

    paginate(){
        const page= this.queryString.page*1 || 1;
        const limit = this.queryString.limit*1 || 10;
        const skip = (page-1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

    
}


const getAllTours = async (req, res)=>{
    try {
        //  filtering operation
        // const queryObj = {...req.query};
        // const excludeFields = ['page', 'sort', 'limit', 'fields'];
        // excludeFields.forEach(el=>delete queryObj[el]);
        // let queryString = JSON.stringify(queryObj);
        // queryString = queryString.replace(/\b(gte|gt|lte|lt|eq|ni)\b/g, match=>`$${match}`)
        // let query=  Tour.find(JSON.parse(queryString))
       
        // sorting operation
        // if(req.query.sort){
        //     const sortBy = req.query.sort.split(',').join(' ')
        //     query = query.sort(sortBy)
        // }

        //limiting fields operation
        // if(req.query.fields){
        //     const fieldsLimited = req.query.fields.split(',').join(' ')
        //     query = query.select(fieldsLimited)
        // } else query = query.select("-__v")

        //limiting documents operation
        // if(req.query.limit){
            
        //     query = query.limit(parseInt(req.query.limit))
        // }

        //pagination 
        // const page= req.query.page*1 || 1;
        // const limit = req.query.limit*1 || 10;
        // const skip = (page-1) * limit;
        // query = query.skip(skip).limit(limit);

        // if(req.query.page){
        //     const documentsNum =await Tour.countDocuments();
        //     if(documentsNum <=skip) throw new Error('this page is not available')
        // }

        //execute query
        const features = new APIFeature(Tour.find(), req.query).filter().sort().limit()
        .limitFields().paginate()
        const tours = await features.query; 
            res.status(200).json({
                status:'sucess',
                result:tours.length,
                data:{tours}
            })
        } catch (error) {
        console.log(error)
        res.status(404).json({
            status:'fail',
            data:{error}
        })
    }
  
 }

 const postTour = async (req, res)=>{
    // const new_tour = new Tour(req.body);
    // new_tour.save();

    try {
        const new_tour = await Tour.create(req.body);
        res.status(201).json({
            status:'sucess',
            data:{new_tour}
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            status:'fail',
            data:{error}
        })
    }
}

const getSingleTour = async (req, res)=>{
try {
  const tour = await Tour.findById(req.params.id);
  res.status(200).json({
      status:'success',
      data:{tour}
  })
} catch (err) {
    console.log(error)
    res.status(404).json({
        status:'fail',
        data:{err}
    })
}
}

const updateTour = async (req, res)=>{
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        console.log('tour' + tour)
        console.log(req.body)
        res.status(200).json({
            status:'success',
            data:{tour}
        })

    } catch (error) {
        res.status(404).json({
            status:'fail',
            data:{error}
        })
    }
 
};

const deleteTour = async (req, res)=>{
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id)
        console.log('tour' + tour)
        res.status(200).json({
            status:'success',
            data:{tour}
        })

    } catch (error) {
        res.status(404).json({
            status:'fail',
            data:{error}
        })
    }
}


 module.exports= {getAllTours, postTour, getSingleTour, updateTour, deleteTour};
