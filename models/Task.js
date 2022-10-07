//const { default: mongoose } = require('mongoose')
const mongoose =require('mongoose')

var TaskSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Required'],
        trim: true,
        maxlength:[20,'Name cannot be more than 20 characters']
    },
    completed:{
        type:Boolean,
        default:false,
    }
})

module.exports=mongoose.model('Task',TaskSchema)