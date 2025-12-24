import express from 'express'
import { createPost,
         getUserPosts,
         deletePost
 } from '../controllers/postController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const postRouter=express.Router()

postRouter.post('/',verifyToken,createPost)
postRouter.post('/',verifyToken,getUserPosts)
postRouter.post('/:id',verifyToken,deletePost)

export default postRouter