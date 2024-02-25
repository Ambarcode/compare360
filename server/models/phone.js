const mongoose=require('mongoose');

const phoneSchema=new mongoose.Schema({
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

const Phone=mongoose.model('phone',phoneSchema);
module.exports=Phone;