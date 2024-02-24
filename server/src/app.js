const express = require('express'); //returns function
const app = express(); //returns handler objects
require('../DB-Connect/db')
const Shirts = require('../models/shirts');
const Jeans = require('../models/jeans');
const Shoes=require('../models/shoes');
const Phone=require('../models/phone');

app.use(express.json()); 

app.get('/shirts',async (req,res)=>{ 
try{   

    let data = await Shirts.find();
    res.send(data);

}
catch(err){ 
    
    console.log(err);
}
    
})

app.get('/jeans' , async (req,res)=>{
    try{
        let data=await Jeans.find();
        res.send(data);
    }
    catch(err){
        console.log(err);
    }
})

app.get('/shoes',async (req,res)=>{ 
    try{   
    
        let data = await Shoes.find();
        res.send(data);
    
    }
    catch(err){ 
        
        console.log(err);
    }
});

app.get('/phones' , async (req,res)=>{
    try{
        let data=await Phone.find();
        res.send(data);
    }
    catch(err){
        console.log(err);
    }
})
 
app.post("/signup",(req,res)=>{                
  
    let {name,phone,email,password,cpassword} = req.body;
    

    if(!name || !phone || !email || !password || !cpassword)   
    {
        return res.status(404).send("fill all data");
    }

    if(password !== cpassword)
    {
        return res.status(405).send("password not same");
    }
    try{
        
    let em = "query for check email";

    if(em == null)
    {
        return res.status(406).send("email already");
    }

    let ch = "posting query";

    if(ch == null)
    {
        return res.status(407).send("server error");
    }

    console.log("hitted")
    return res.status(200).send("Successfull");
}
catch(err){
    console.log(err);
}


});





app.listen(5000,()=>{
    console.log("server loaded");  
})