var{CustomAPIError}=require('../errors/custom-error')

var errorHandlerMiddleware =(err,req,res,next)=>{
    console.log(err);
    // console.log(err instanceof CustomAPIError)
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    // return res.status(500).json({msg:"Something went wrong, Please try again later"})
    return res.status(500).json({'Error Name':err.errors.name.name,'Error message' :err.errors.name.message})
}

module.exports=errorHandlerMiddleware