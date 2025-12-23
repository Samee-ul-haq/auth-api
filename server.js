import express from 'express'
import mongoose from 'mongoose'
import router from './routes/auth.js'
import postRouter from './routes/posts.js'
import 'dotenv/config'

const app=express() 
app.use(express.json())

const connect_db = process.env.MONGODB_URI

mongoose.connect(connect_db)
.then(()=>console.log("MONGO_DB connected"))
.catch((err)=>console.error("connection failed",err))

app.get('/',(req,res)=>{
    res.json("Auth is running")
})
app.use('/auth',router)
app.use('/posts',postRouter)
const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})