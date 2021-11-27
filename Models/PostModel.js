const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String
    },
    fullname: {
        type: String
    },
    lastname: {
        type: String
    },
    post: {
        type: String
    },
    course: {
        type: String
    },
    email: {
        type: String
    },
    ass: {
        type: Boolean
    },
    tutorial: {
        type: Boolean
    },
    price: {
        type: Number
    },
    url: {
        type: String
    },
    sponsored: {
        type: Boolean
    },
    news: {
        type: Boolean
    },
    src: {
        type: String
    },
    srctype: {
        type: String
    },
    owner: {
        type: String
    },
    duration: {
        type: String
    },
    department: {
        type: String
    },
    level: {
        type: String
    },
    image: {
        type: String
    },
    comments: [],
    followers: [],
    likes: [],
    verified: {
        type: Boolean
    },
    topic: {
        type: String
    }
}, {timestamps: true})


const Post = mongoose.model('Post', postSchema)
module.exports = Post