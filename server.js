const app = require('./app');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

// const DB = process.env.DATABASE.replace('<password>', 'SuWlCoeyb7MzT0Og');
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser:true, 
    useCreateIndex:true, 
    useFindAndModify:false,
    useUnifiedTopology:true
}).then((con)=>{
    // console.log('connection', con.connection);
    console.log('database connected')
})




const PORT = process.env.PORT ||8000;
const NODE_ENV = process.env.NODE_ENV;
app.listen(PORT, ()=>console.log(`server has started on localhost:${PORT} in ${NODE_ENV} mode`))

