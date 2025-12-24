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

export const getUserPosts =async (req,res)=>{
try {
    const userId = req.user.id
    
    const personalPosts=await Post.find({
        user:userId
    })
    res.status(200).json(personalPosts)
} catch (error) {
    res.status(500).json({message:"Error creating post",error})
}
}

export const deletePost =async (req,res)=>{
    try {
        const id=req.params.id
        const postToDelete= await Post.findById(id)
    
        if(!postToDelete)
            return res.status(404).json({message:"Post not found"})
    
        if(postToDelete.user.toString() !== req.user.id)
            return res.status(403).json({message:"Forbidden"})
    
        await postToDelete.deleteOne()
        res.status(200).json({message:"Deleted successfully"})
        
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
}