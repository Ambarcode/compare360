const mongoose = require("mongoose"); 


const shirtSchema = new mongoose.Schema({
    name:{
        type:String
    },
    mrp:{
        type:Number
    },
    colors:[
        {
            color:{
                type:String
            },
            sizes:[
                {
                    type:Number
                }
            ],
            description:{
                type:String
            },
            images:[
                {
                    type:String
                }
            ],
            by:[
                {
                    web:{
                        type:String
                    },
                    price:{
                        type:Number
                    },
                    link:{
                        type:String
                    }  
                }
            ]
        }
    ]
});


const Shirts = mongoose.model('SHIRTS',shirtSchema);



module.exports=Shirts;