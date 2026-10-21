import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
    shortId: {
        type:String,
        required:true,
        unique:true,
        
    },
    originalUrl:{
        type:String,
        required:true,
    },
    clicks:{
        type:Number,
        default:0
    },
    expiresAt:{
        type:Date,
        default:()=> new Date(Date.now()+30*24*60*60*1000),
        expires:0
    }
},
    {
        timestamps:true
    }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;