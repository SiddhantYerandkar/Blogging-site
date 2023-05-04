const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const blogController = require('../controller/blogController')
const auth = require('../middleware/authentication')

router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)

router.post('/createPost', auth.authenticate, blogController.createBlog)
router.get('/getPosts', blogController.viewPosts)
router.put('/editPost/:postId', auth.authenticate, blogController.editPost)
router.delete('/deletePost/:postId', auth.authenticate, blogController.deletePost)
router.get('/getPosts/:userId', auth.authenticate, blogController.getPostsById)
router.get('/post/:postId', blogController.getPostsbyPostId)

module.exports = router