var express=require('express')
var router=express.Router()

// var {
//     getAllTasks,
//     createTask,
//     getTask,
//     updateTask,
//     deleteTask
// }=require('../controllers/tasks')

// router.route('/').get(getAllTasks).post(createTask)
// router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

// module.exports=router

//In above way loads fast

var Task=require('../models/Task')
var asyncWrapper = require('../middleware/async')
var {createCustomError}=require('../errors/custom-error')

var getAllTasks=asyncWrapper (
    async (req,res)=>{
        var tasks=await Task.find({})
        // res.status(200).json({tasks})
        // res.status(200).json({tasks,amount:tasks.length})
        res.status(200).json({status:'success', data:{tasks,nbHits:tasks.length}})
    }
)

var createTask=asyncWrapper(async (req,res)=>{
    var task = await Task.create(req.body)
    res.status(201).json({task})
})
var getTask=asyncWrapper(async (req,res,next)=>{
    var {id:taskID}=req.params
    console.log("a",taskID)
    var task=await Task.findOne({_id:taskID})

    if(!task){
        // var err =new Error('Not Found Customisation')
        // err.status=404;
        // return next(err)
        // return res.status(404).json({msg:`No task with id : ${taskID}`})
        // console.log(next(createCustomError(`No task with id : ${taskID}`,404)))
        return next(createCustomError(`No task with id : ${taskID}`,404))
        
    }
    res.status(200).json({task})
})
var updateTask=asyncWrapper(async (req,res,next)=>{
    var{id:taskID}=req.params
    var task= await Task.findOneAndUpdate({_id:taskID},req.body,{
        new:true, //returns new item to the task variable
        runValidators:true,
        overwrite:true
    })
    if(!task){
        // return res.status(404).json({msg:`No task with id : ${taskID}`})
        return next(createCustomError(`No task with id : ${taskID}`,404))

    }
    res.status(200).json({task})
    
})
var deleteTask=asyncWrapper(async (req,res,next)=>{
    var{id:taskID}=req.params
    var task= await Task.findByIdAndDelete({_id:taskID})
    if (!task){
        // return res.status(404).json({msg:`No task with id :${taskID}`})
        return next(createCustomError(`No task with id : ${taskID}`,404))

    }
    res.status(200).json({task})
    // res.status(200).send()
    // res.status(200).json({task:null, status:'success'})
})

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports=router