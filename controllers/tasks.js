var Task=require('../models/Task')
var getAllTasks=async (req,res)=>{
    try {
        var tasks=await Task.find({})
        // res.status(200).json({tasks})
        // res.status(200).json({tasks,amount:tasks.length})
        res.status(200).json({status:'success', data:{tasks,nbHits:tasks.length}})
    } catch (err) {
        res.status(500).json({msg:err})
    }
}

var createTask=async (req,res)=>{
    try {
        var task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (err) {
        res.status(500).json({msg:err})
    }

}
var getTask=async (req,res)=>{
    try {
        var {id:taskID}=req.params
        console.log("a",taskID)
        var task=await Task.findOne({_id:taskID})

        if(!task)
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        res.status(200).json({task})
    } catch (err) {
        res.status(500).json({msg:err})
    }
}
var updateTask=async (req,res)=>{
    try {
        var{id:taskID}=req.params
        var task= await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true, //returns new item to the task variable
            runValidators:true,
            overwrite:true
        })
        if(!task){
            return res.status(404).json({msg:`No task with id : ${taskID}`})
        }
        res.status(200).json({task})
    } catch (err) {
        res.status(500).json({msg:err})
    } 
}
var deleteTask=async (req,res)=>{
    try {
        var{id:taskID}=req.params
        var task= await Task.findByIdAndDelete({_id:taskID})
        if (!task){
            return res.status(404).json({msg:`No task with id :${taskID}`})
        }
        res.status(200).json({task})
        // res.status(200).send()
        // res.status(200).json({task:null, status:'success'})
    } catch (err) {
        res.status(500 ).json({msg:err})
    }
}

module.exports={
    getAllTasks,createTask,getTask,updateTask,deleteTask
} 