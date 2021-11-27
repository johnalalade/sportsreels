const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const imageBasePath = 'uploads/'

const loginSchema = new Schema({
    avatar: {
        type: String
    },
    fullname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    sport: {
        type: Array
    },
    signed: {
        type: Boolean
    },
    scouting: {
        type: Boolean
    },
    role: {
        type: String
    },
    about: {
        type: String
    }

}, {timestamps: true})

// loginSchema.virtual('imagePath').get(function() {
//     if(this.image != null && this.imageType != null) {
//         return `data:${this.imageType};charset=utf-8;base64,${this.image.toString(base64)}`
//     }
// })

const Login = mongoose.model('Users', loginSchema);
module.exports = Login