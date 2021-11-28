const PostController = require('../Controllers/PostController')
const authenticate = require('../Middleware/authenticate')
const upload = require('../Middleware/upload')

const express = require('express')
const post = express.Router()

post.post('/posts', PostController.indexPost)
post.post('/posts/addpost', upload, PostController.addPost)
post.post('/posts/share', authenticate, upload, PostController.sharePost)
post.post('/posts/addnews', authenticate, upload, PostController.addNews)
// post.post('/posts/addads', authenticate, upload, PostController.addAds)
// post.post('/posts/addass', authenticate, upload, PostController.addAss)
// post.post('/posts/addtutorial', authenticate, upload, PostController.tutorial)
post.post('/posts/myposts', PostController.showOne)
post.post('/posts/comment', PostController.commenting)
// post.post('/posts/asscomment', authenticate, upload, PostController.assCommenting)
post.post('/posts/search', authenticate, PostController.searchPost)
post.post('/posts/delete', PostController.deletePost)
post.post('/posts/like',  PostController.like)
post.post('/posts/show', PostController.showPost)
post.post('/posts/buy', authenticate, PostController.buy)

module.exports = post
// authenticate,