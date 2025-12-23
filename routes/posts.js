import express from 'express'
import { createPost } from '../controllers/postController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const postRouter=express.Router()

postRouter.post('/',verifyToken,createPost)

export default postRouter