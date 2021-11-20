const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const imageBasePath = 'uploads/'

const loginSchema = new Schema({
    avatar: {
        type: String
    },
    firstname:{
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    dob: {
        type: Date
    },
    country: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    sport: {
        type: String
    },
    signed: {
        type: Boolean
    },
    searching: {
        type: Boolean
    }

}, {timestamps: true})

// loginSchema.virtual('imagePath').get(function() {
//     if(this.image != null && this.imageType != null) {
//         return `data:${this.imageType};charset=utf-8;base64,${this.image.toString(base64)}`
//     }
// })

const Login = mongoose.model('Login', loginSchema);
module.exports = Login