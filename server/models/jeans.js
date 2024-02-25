const mongoose = require("mongoose"); 


const jeansSchema = new mongoose.Schema({
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


const Jeans = mongoose.model('JEANS',jeansSchema);



module.exports=Jeans;