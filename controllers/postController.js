import Post from '../models/Post.js'

export const createPost =async (req,res) =>{
try {
    const {title,content}=req.body
    
    const newPost=await Post.create({
        title,
        content,
        user:req.user.id
    })
     
     res.status(201).json(newPost)
} catch (error) {
    return res.status(500).json({message:"Error creating post",error})
}
}