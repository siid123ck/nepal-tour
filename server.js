const app = require('./app');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const DB = process.env.DATABASE.replace('<password>', 'SuWlCoeyb7MzT0Og');
mongoose.connect(DB, {
    useNewUrlParser:true, 
    useCreateIndex:true, 
    useFindAndModify:false,
    useUnifiedTopology:true
}).then((con)=>{
    console.log(con.connection);
    console.log('database connected')
})

const tourSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:[true, 'tour must have name'], 
        unique:true
    },
    rating:{
        type:String,  
        required:true
    },
    price:{
        type:String, 
        required:[true, 'tour must have price']
    }
})
const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
    name:" the  river exp", 
    rating:4,
    price:200
})

testTour.save().then(data=>console.log(data)).catch(err=>console.log(`error: ${err}`))

const PORT = process.env.PORT ||8000;
const NODE_ENV = process.env.NODE_ENV;
app.listen(PORT, ()=>console.log(`server has started on localhost:${PORT} in ${NODE_ENV} mode`))

