var mongoose=require('mongoose')

// var connection='mongodb+srv://myatlas:7IMrW1bedG8xzBJF@taskmanager.e6jag.mongodb.net/TaskManager?retryWrites=true&w=majority'

const connectDB=(url)=>{
    return mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
}
// .then(()=>console.log("Connected to Database"))
// .catch((err)=>console.log("Error while connecting to database",err.codeName,"with Error Code",err.code,"\n\n",err))

module.exports=connectDB