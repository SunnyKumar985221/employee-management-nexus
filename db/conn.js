const DB = process.env.DATABASE ;
const mongoose = require('mongoose');
//   useCreateIndex:true,// useNewUrlParser:true,// useUnifiedTopology:true,// useFindAndModify:false
mongoose.connect(DB,{
useNewUrlParser:true,
useUnifiedTopology:true
}).then(()=>{
    console.log("Connection is Successful");
}).catch((e) =>{
    console.log(e);
})