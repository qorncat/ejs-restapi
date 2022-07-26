const mongoose=require("mongoose");

mongoose.connect(process.env.MONGODB ,{useCreateIndex:true, useFindAndModify:false, useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=> console.log("MongoDB Connected..."))
    .catch(err => console.log(err));