const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    portfolio: {
        type: Array
    },
    balance: {
        type: Number
    },
    debt: {
        type: Number
    },
    duration:{
        type: Number
    }
}, { timestamps: true })

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, 10, (err, hashedpassword) => {
        if (err) return next(err)
        this.password = hashedpassword
        next();
    })
})

const User = mongoose.model('User', userSchema)
module.exports = User