const Login = require('../Models/UserProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer')

const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-east-2'
//const uploadPath = path.join('public', Login.imageBasePath)
require('dotenv').config();

// show list of all available User
const indexProfile = (req, res, next) => {
    Login.find()
        .then(response => {
            res.josn({
                response
            })
        })
        .catch(error => {
            res.json({
                message: "An error occured"
            })
        })
}

// Register

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }

        let login = new Login({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            dob: req.body.dob,
            country: req.body.country,
            sport: req.body.sport,
            signed: req.body.signed,
            searching: req.body.searching,
            password: hashedPass
        })
        login.save()
            .then(user => {

                res.json({
                    message: "Login Successful",
                    id: user._id,
                    username: user.username,
                     src: user.src,
                     phone: user.phone,
                     email: user.email,
                     department: user.department,
                     level: user.level,
                     isVerified: true
                })
                //email
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'gigveeteam@gmail.com',
                        pass: 'JohnAlalade@4444'
                    }
                });

                var mailOptions = {
                    from: 'gigveeteam@gmail.com',
                    to: req.body.email,
                    subject: 'Welcome To Sport Reels',
                    html: `<h1> <strong>Welcome To GigVee</strong> </h1> <br/> <p>Hello ${req.body.firstname},</p> <p>We are glad to have you here at Gigvee! Now you can start buying,recruiting people,getting deals etc. from people all around the world, you can also become a vendor by opening up a store</p> <p>We are pleased to have you here! And we hope you enjoy your journey into a better Business Experience.</p> <p>Kind regards..</p> <quote>~John Alalade (Team Leader)</quote>`
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log("Emailimg error: "+error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            })
            .catch(error => {
                res.json({
                    message: "An Error Occured!"
                })
            })
    })


}

const login = (req, res, next) => {
    var userName = req.body.userName
    var password = req.body.password

    Login.findOne({ $or: [{ email: userName }, { phone: userName }] })
        .then(user => {

            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, "Iyaaduke+5")
                        // console.log(user)
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
                    }
                })
            } else {
                res.json({
                    message: "No User Found"
                })
            }
        })
}

// show one 
const showOne = (req, res, next) => {
    let userID = req.body.userID
    Login.findById(userID)
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
const updateProfile = (req, res, next) => {

    let userID = req.body.userID

    let updatedProfile = {
        bookmarks: [],
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        sport: req.body.sport,
        country: req.body.country,
        searching: req.body.searching,
        signed: req.body.signed
    }
    if (req.file) {
        updatedProfile.avatar = `https://gigvee.s3.us-east-2.amazonaws.com/${uuidv4() + req.body.filename.trim()}`

        fs.readFile(req.file.path, (err, data) => {
            if (err) throw err;
            const s3 = new aws.S3();
            const s3Params = {
                Bucket: S3_BUCKET,
                Key: updatedProfile.avatar.slice(42),
                Body: data,
                // Expires: 180,
                ContentType: req.file.mimetype,
                ContentDisposition: "Attachment",
                ACL: 'public-read'
            };
            s3.putObject(s3Params, function (s3Err, data) {
                if (s3Err) throw s3Err

                console.log('File uploaded successfully at --> ' + data.Location)
                fs.unlink(req.file.path, (err) => {
                    if (err) console.log('Unable to delete used file ' + err)
                    else console.log('file deleted')
                })

            })

        })
    }
    Login.findById(userID)
        .then((data) => {
            if (req.body.checkerImage) {
                if (data.avatar) {
                    console.log(data.avatar)
                    const s3 = new aws.S3();
                    const imgName = data.avatar.slice(42)
                    const s3Params = {
                        Bucket: S3_BUCKET,
                        Key: imgName,
                        // Expires: 180,
                        // ContentType: fileType,
                        // ACL: 'public-read'
                    };

                    s3.deleteObject(s3Params, function (err, data) {
                        if (err) console.log("image deletion failed" + err, err.stack)
                        else console.log("image deleted")
                    })
                }
            }
            else { return }

        })
        .then(() => {
            Login.findByIdAndUpdate(userID, { $set: updatedProfile })
                .then(() => {
                    res.json({
                        message: "Profile Updated Successfully"
                    })
                })
                .catch(error => {
                    res.json({
                        message: "An Error Occured"
                    })
                })
        })
        .catch((err) => console.log(err))


}



module.exports = {
    register, login, showOne, updateProfile, indexProfile
}

// {expiresIn: '24h'}