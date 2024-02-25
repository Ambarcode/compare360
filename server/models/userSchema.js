const mongoose =require('mongoose');
const bcrypt =require("bcryptjs")
const userSchema= new mongoose.Schema({

    name:{
        type: String
    },
    phone:{
        type: Number
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    cpassword:{
        type: String
    },
     wishlist:[{
        id: {
            type: String,
        },
        color: {
            type: String,
        }
    }]
})
   
    userSchema.methods.passwordEncrypt= async function(){
        try{

        let hashedPass=await bcrypt.hash(this.password,12);
        this.password=hashedPass;
        this.cpassword=hashedPass;
        await this.save();
        return true;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }


  



   const User=mongoose.model('users',userSchema);
    
    module.exports=User;