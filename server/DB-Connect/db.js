const mongoose = require('mongoose');


 mongoose.connect("mongodb+srv://compare360:Capstone2002@cluster0.t7kz3p0.mongodb.net/compare360?retryWrites=true&w=majority&appName=Cluster0")
 .then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log(err)
})