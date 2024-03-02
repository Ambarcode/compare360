const express = require('express'); //returns function
const app = express(); //returns handler objects
require('../DB-Connect/db')
const Shirts = require('../models/shirts');
const Jeans = require('../models/jeans');
const Shoes=require('../models/shoes');
const Phone=require('../models/phone');
const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const cookieParser = require("cookie-parser");
const authenticate = require('../Middleware/authenticate.js');


app.use(cookieParser());
app.use(express.json()); //to activate middleware  


app.get('/shirts',async (req,res)=>{ 
try{   
    let data = await Shirts.find({name:"Ketch"});
    res.send(data);
}
catch(err){ 
    console.log(err);
    return res.status(400).send("Server Error");
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
        return res.send(data);
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

app.post('/signup' , async (req,res)=>{

    try{

    
    let data = (req.body);

    let {name,email,password,cpassword,phone} = data;

    if(password !== cpassword)
    {
        return res.status(401).send("Password not same");
    }

    let em = await User.findOne({email:email}) 
    if(em)
    {
        return res.status(402).send("Email already Registered");
    }
    
    let user=new User(data)   
    let r = await user.passwordEncrypt();
    // let u = await User.insertMany(data);
    if(r)
    return res.status(200).send("Registered");

    return res.status(400).send("Server Error")   



    }
    catch(err)
    {
        console.log(err);
        return res.status(400).send("Server Error")
    }

    
})

//we'll create login route , we'll also generate token
app.get('/login',async (req,res)=>{
    try{

    
    let {email,password} = req.body ;   
    

 
    let user = await User.findOne({email})
    

  
    
    if(user)
    {
        
        let check = await bcrypt.compare(password,user.password);
        if(check)
        { 
            let token = user.generateToken();
            if(token) {

                res.cookie('jwtoken', token,
                {

                    expires: new Date(Date.now() + 25892000000),
                    httpOnly:true
                    //dafaulty it runs on https, as we are working with http not https

                });
            return res.status(200).json(user); 
            }
            
            return res.status(404).send("Server Error");
        }
        else{
            return res.status(401).send("Invalid Credentials");
        }
    }

    return res.status(402).send("Invalid Credentials");
}
catch(err)
{
    console.log(err);
    return res.status(400).send("Server Error")
}

})
   

app.get('/loggedin',authenticate,async (req,res)=>{

    console.log("done")


})

//User Registration

// app.post('/signin',(req,res)=>{
//         const {name , username , phone , email , password , cpassword}=req.body;
//         if ( !name || !username || !phone || !email || !password || !cpassword) {
//             return res.status(420).json({ error: "Complete all checks" });
//         }
         

//         //now after this , we need to check whether username already exists or not
//         if()


// })

 
// app.post("/signup",(req,res)=>{                
  
//     let {name,phone,email,password,cpassword} = req.body;
    

//     if(!name || !phone || !email || !password || !cpassword)   
//     {
//         return res.status(404).send("fill all data");
//     }

//     if(password !== cpassword)
//     {
//         return res.status(405).send("password not same");
//     }
//     try{
        
//     let em = "query for check email";

//     if(em == null)
//     {
//         return res.status(406).send("email already");
//     }

//     let ch = "posting query";

//     if(ch == null)
//     {
//         return res.status(407).send("server error");
//     }

//     console.log("hitted")
//     return res.status(200).send("Successfull");
// }
// catch(err){
//     console.log(err);
// }


// });





app.listen(5000,()=>{
    console.log("server loaded");  
})