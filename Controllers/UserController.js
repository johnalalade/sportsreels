const User = require('../Model/UserModel.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { OutgoingMessage } = require('http');
require('dotenv').config();

// Registering new user
const register = (req, res, next) => {
    // Getting user details
    let details = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        balance: 10000,
        debt: 0,
        portfolio: [
            {
                symbol: "AAPL",
                totalQuantity: 20,
                equityValue: 2500.0,
                pricePerShare: 125.0
            },
            {
                symbol: "TSLA",
                totalQuantity: 5.0,
                equityValue: 3000.0,
                pricePerShare: 600.0
            },
            {
                symbol: "AMZN",
                totalQuantity: 1.38461538,
                equityValue: 4500.0,
                pricePerShare: 150.0
            }
        ]
    }

    // Creating a new user instance with the "details" object
    let user = new User(details)

    // Saving user details to database
    user.save()
        .then((user) => {
            // Creating Session Token
            let token = jwt.sign({ name: user.name }, process.env.PRIVATE_PHRASE)

            // Successful message
            res.json({
                message: "Signup Successful",
                id: user._id,
                token
            })

            // Sending registration Email on successful registration
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'johnalalade6@gmail.com',
                    pass: 'JOHNNYBOTB'
                }
            });

            var mailOptions = {
                from: 'johnalalade6@gmail.com',
                to: req.body.email,
                subject: 'Welcome To Trove Shares',
                html: `<h1> <strong>Welcome To Trove Shares</strong> </h1> <br/> <p>Hello ${req.body.name},</p> <p>We are glad to have you here at Trove Shares! Now you can manage your shares safely and securely.</p> <p>We are pleased to have you here! And we hope you enjoy your shareholding experience.</p> <p>Kind regards..</p> <quote>~Trove Shares</quote>`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("Emailimg error: " + error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        })
        .catch((err) => {
            res.json({ message: "An Error Occured " + err })
            console.log({ message: "An Error Occured " + err })
        })
}

// Logging users in
const login = (req, res, next) => {
    var identifier = req.body.username
    var password = req.body.password

    User.findOne({ $or: [{ email: identifier }, { phone: identifier }] })
        .then(user => {

            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                        console.log(err)
                    }
                    if (result) {
                        // Creating Session Token
                        let token = jwt.sign({ name: user.name }, process.env.PRIVATE_PHRASE)

                        // Successful message
                        res.json({
                            message: "Login Succesful",
                            token,
                            id: user._id,
                            response: user
                        })
                    } else {
                        res.json({
                            message: "Password Does Not Match!"
                        })
                        console.log("Password does not match")
                    }
                })
            } else {
                res.json({
                    message: "No User Found"
                })
                console.log("No user found")
            }
        })
}


// Fetch one user
const showUser = (req, res, next) => {
    let userID = req.body.userID
    User.findById(userID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                error,
                message: "Can't Find User"
            })
        })

}

// Update Profile
const update = (req, res, next) => {
    // ID of user to be updated
    let userID = req.body.userID

    // New Profile
    let newProfile = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    }

    if(req.body.password.length > 1){
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
                res.json({
                    error: err
                })
            }
    
            newProfile.password = hashedPass
        })
    }
    

    // Updating user profile
    User.findByIdAndUpdate(userID, { $set: newProfile })
        .then((response) => {
            res.json({
                message: "Profile Updated Successfully",
                response
            })

        })
        .catch(error => {
            console.log('Update error ' + error)
            res.json({
                message: "Update Occured " + error
            })
        })
}

//Payment 
const payment = (req, res, next) => {
    let userID = req.body.userID
    let loan = req.body.loan
    let charge = req.body.charge
    let money = parseInt(charge)

    User.findById(userID)
        .then(response => {
            let data = {
                portfolio: response.portfolio.map((port) => {
                    let newValue = port.equityValue + loan
                    port.equityValue = newValue
                    return port
                }),
                balance: response.balance + money,
                debt: response.debt - money 
            }

            User.findByIdAndUpdate(userID, { $set: data })
                .then((response) => {
                    res.json({
                        message: "Profile Updated Successfully",
                        response
                    })

                })
                .catch(error => {
                    console.log('Update error ' + error)
                    res.json({
                        message: "Update Occured " + error
                    })
                })

        })
        .catch(error => {
            res.json({
                error,
                message: "Can't Find User"
            })
        })

}

// Taking Loan
const loaning = (req, res, next) => {
    let userID = req.body.userID
    let loan = req.body.loan
    let charge = req.body.charge

    User.findById(userID)
        .then(response => {
            let data = {
                portfolio: response.portfolio.map((port) => {
                    let newValue = port.equityValue - loan
                    port.equityValue = newValue
                    return port
                }),
                balance: response.balance - charge,
                debt: charge,
                account: req.body.account,
                bank: req.body.bank,
                duration: req.body.duration
            }

            User.findByIdAndUpdate(userID, { $set: data })
                .then((response) => {
                    res.json({
                        message: "Profile Updated Successfully",
                        response
                    })

                })
                .catch(error => {
                    console.log('Update error ' + error)
                    res.json({
                        message: "Update Occured " + error
                    })
                })

        })
        .catch(error => {
            res.json({
                error,
                message: "Can't Find User"
            })
        })


}

// Exportig Functions
module.exports = {
    register, login, showUser, update, payment, loaning
}