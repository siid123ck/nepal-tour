const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeature = require('../utils/apiFeatures');

module.exports.getAll = Model=>catchAsync(async (req, res, next)=>{
    let filter = {}; 
    if(req.params.tourId) filter = {tour:req.params.tourId}

    const features = new APIFeature(Model.find(filter), req.query).filter().sort().limit()
    .limitFields().paginate()
    const documents = await features.query; 
    res.status(200).json({
            status:'sucess',
            result:documents.length,
            data:documents
        })

})

module.exports.createOne = Model=>catchAsync(async (req, res, next)=>{
    // const new_doc = new Model(req.body);
    // new_doc.save();
    const doc= await Model.create(req.body);
    const new_doc = await Model.findOne(doc._id)

    res.status(201).json({
        status:'sucess',
        data:new_doc
    })
})

module.exports.getOne = (Model, populateData)=>catchAsync(async (req, res, next)=>{
    const query = Model.findById(req.params.id)
    if(populateData) query.populate(populateData)
    const doc = await query;
    if(!doc) return next(new AppError(`Document not found with id ${req.params.id}`, 404));
  
    res.status(200).json({
        status:'success',
        data:{doc}
    })
  })

module.exports.updateOne = Model=> catchAsync(async (req, res, next)=>{
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if(!doc) return next(new AppError(`Document not found with id ${req.params.id}`, 404));
    
    res.status(200).json({
        status:'success',
        data:{doc}
    })
});

module.exports.deleteOne = Model => catchAsync(async (req, res, next)=>{
    const doc = await Model.findByIdAndDelete(req.params.id)
    if(!doc) return next(new AppError(`Document not found with id ${req.params.id}`, 404));
    res.status(200).json({
        status:'success',
        data:{doc}
    })
}) 