const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    product: {
        type: String
    },
    description: {
        type: String,
    },
    price: {
        type: String,
    },
    img:{
        type: String,
    },
    comments: []
}, {timestamps: true});

const Product = mongoose.model('Product', userProfileSchema)
module.exports = Product