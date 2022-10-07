var express=require('express');
var app=express();
var tasks=require('./routes/tasks')
var connectDB=require('./db/connect')
var notFound=require('./middleware/notFound')
var errorHandlerMiddleware=require('./middleware/error-handler')
require('dotenv').config()
//middleware

app.use(express.json())
app.use(express.static('./public'))


//routes
app.get('/MB',(req,res)=>{
    res.send('Task Manager App')
})
app.use('/api/v1/tasks',tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

// app.get('/api/v1/tasks')        - get all the tasks
// app.post('/api/v1/tasks')       - create a new task
// app.get('/api/v1/tasks/:id')    - get single task
// app.patch('/api/v1/tasks/:id')  - update task
// app.delete('/api/v1/tasks/:id') - delete task

var port=process.env.PORT || 200

var start=async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log("Server is listening on port",port))
    } catch (error) {
        console.log(error)
    }
}   

start()

// PORT=3000 node app.js