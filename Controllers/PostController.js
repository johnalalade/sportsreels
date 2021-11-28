const Post = require('../Models/PostModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer')
const { OutgoingMessage } = require('http');
const Login = require('../Models/UserProfile');
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-east-2'
// const sharp = require('sharp')
require('dotenv').config();

//search
const searchPost = (req, res, next) => {
    let search = req.body.data
    console.log(search)
    Post.find({
        $or: [{ username: new RegExp(search, "ig") }, { firstname: new RegExp(search, "ig") },
        { lastname: new RegExp(search, "ig") }, { department: new RegExp(search, "ig") }, { topic: new RegExp(search, "ig") },
        { level: new RegExp(search, "ig") }, { post: new RegExp(search, "igm") }, { course: new RegExp(search, "igm") }, { _id: new RegExp(search, "igm") }]
    })
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            console.log(error)
            res.json({
                message: "An error Occured"
            })
        })

}


//index post
const indexPost = (req, res, next) => {
    Post.find()
        .then((response) => {
            res.json({
                response
            })
        })
        .catch((err) => {
            console.log("index Error")
            res.json({
                message: "An Error Occured"
            })
        })
}

// Show one
const showOne = (req, res, next) => {
    let ownerId = req.body.id

    Post.find({ owner: ownerId })
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occured" + error
            })
        })
}

// Show one
const showPost = (req, res, next) => {
    let id = req.body.id

    Post.findById(id)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: "An error Occured" + error
            })
        })
}

//add post
const addPost = (req, res, next) => {
    let input = {
        fullname: req.body.fullname,
        post: req.body.post,
        owner: req.body.owner,
        department: req.body.department,
        level: req.body.level,
        likes: [],
        followers: req.body.followers,
        image: req.body.image,
        verified: req.body.verified,
        topic: req.body.topic
    }
    if (req.body.verified === "undefined" || req.body.verified === null) {
        input.verified = false
    }
    if (req.file) {
        input.src = `https://gigvee.s3.us-east-2.amazonaws.com/${uuidv4() + req.body.filename.trim()}`
        input.srctype = req.file.mimetype
        // if (['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/gif', 'image/x-cmx', 'image/x-icon'].includes(req.file.mimetype)) {
        //     sharp(req.file.path)
        //         .jpeg({ mozjpeg: true, quality: 85, })
        //         .toBuffer()
        //         .then(data => {
        //             const s3 = new aws.S3();
        //             const s3Params = {
        //                 Bucket: S3_BUCKET,
        //                 Key: input.src.slice(42),
        //                 Body: data,
        //                 // Expires: 180,
        //                 ContentDisposition: "attachment;",
        //                 ContentType: req.file.mimetype,
        //                 ACL: 'public-read'
        //             };
        //             s3.putObject(s3Params, function (s3Err, data) {
        //                 if (s3Err) throw s3Err

        //                 console.log('File uploaded successfully at --> ' + data.Location)
        //                 fs.unlink(req.file.path, (err) => {
        //                     if (err) console.log('Unable to delete used file ' + err)
        //                     else console.log('file deleted')
        //                 })

        //             })
        //         })
        // } else {
            fs.readFile(req.file.path, (err, data) => {
                if (err) throw err;
                const s3 = new aws.S3();
                const s3Params = {
                    Bucket: S3_BUCKET,
                    Key: input.src.slice(42),
                    Body: data,
                    // Expires: 180,
                    ContentDisposition: "attachment;",
                    ContentType: req.file.mimetype,
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
        // }

    }

    let post = new Post(input)

    post.save()
        .then((response) => {
            response.followers.forEach(i => {
                // Login.findById(i)
                //     .then(dd => {
                //         let note = {
                //             notification: {
                //                 title: req.body.username,
                //                 body: `${req.body.username} just made a post... Check it out.`
                //             },

                //             apns: {
                //                 payload: {
                //                     aps: {
                //                         'mutable-content': 1
                //                     }
                //                 }
                //             },
                //             webpush: {
                //                 fcmOptions: {
                //                     link: "https://www.uniconne.com/home?oau=true"
                //                 }
                //             },
                //             token: dd.regToken
                //         }

                //         const notification_options = {
                //             priority: "high"
                //         }

                //         const regToken = respons.map(resp => resp.regToken)
                //         const message = note
                //         const options = notification_options

                //         admin.messaging().send(note)
                //             .then((re) => console.log({
                //                 message: "Notification Sent"
                //             }))
                //             .catch((err) => console.log({
                //                 message: "Notification Failed"
                //             }))



                //     })
            })
            res.json({
                message: "Post Added Successfully"
            })
        })
        .catch((err) => {
            console.log("Post Error " + err)
            res.json({
                message: "An error occured"
            })
        })
}


//Share post
const sharePost = (req, res, next) => {
    let input = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        post: req.body.post,
        owner: req.body.owner,
        department: req.body.department,
        level: req.body.level,
        likes: [],
        followers: req.body.followers,
        image: req.body.image,
        verified: req.body.verified,
        topic: req.body.topic
    }
    if (req.body.verified === "undefined" || req.body.verified === null) {
        input.verified = false
    }
    if (req.body.src) {
        input.src = req.body.src
        input.srctype = req.body.srctype
    }

    let post = new Post(input)

    post.save()
        .then((response) => {
            res.json({
                message: "Post Shared Successfully"
            })
        })
        .catch((err) => {
            console.log("Post Error")
            res.json({
                message: "An error occured"
            })
        })
}

// add news
const addNews = (req, res, next) => {
    let input = {
        firstname: "Uniconne",
        lastname: "Team",
        username: req.body.username,
        post: req.body.post,
        likes: [],
        owner: req.body.owner,
        news: true,
        image: req.body.image,
        verified: true,
        topic: req.body.topic
    }
    if (req.file) {
        input.src = `https://gigvee.s3.us-east-2.amazonaws.com/${uuidv4() + req.body.filename.trim()}`
        input.srctype = req.file.mimetype

        if (['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/gif', 'image/x-cmx', 'image/x-icon'].includes(req.file.mimetype)) {
            sharp(req.file.path)
                .jpeg({ mozjpeg: true, quality: 85, })
                .toBuffer()
                .then(data => {
                    const s3 = new aws.S3();
                    const s3Params = {
                        Bucket: S3_BUCKET,
                        Key: input.src.slice(42),
                        Body: data,
                        // Expires: 180,
                        ContentDisposition: "attachment;",
                        ContentType: req.file.mimetype,
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
        } else {
            fs.readFile(req.file.path, (err, data) => {
                if (err) throw err;
                const s3 = new aws.S3();
                const s3Params = {
                    Bucket: S3_BUCKET,
                    Key: input.src.slice(42),
                    Body: data,
                    // Expires: 180,
                    ContentDisposition: "attachment;",
                    ContentType: req.file.mimetype,
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
    }

    let post = new Post(input)

    post.save()
        .then((response) => {
            Login.find()
                .then((respons) => {
                    respons.forEach(dd => {
                        let note = {
                            notification: {
                                title: "Uniconne Team",
                                body: "There is a new post from Uniconne team for you to view"
                            },

                            apns: {
                                payload: {
                                    aps: {
                                        'mutable-content': 1
                                    }
                                }
                            },
                            webpush: {
                                fcmOptions: {
                                    link: "https://www.uniconne.com/home?oau=true"
                                }
                            },
                            token: dd.regToken
                        }

                        const notification_options = {
                            priority: "high"
                        }

                        const regToken = respons.map(resp => resp.regToken)
                        const message = note
                        const options = notification_options

                        admin.messaging().send(note)
                            .then((re) => console.log({
                                message: "Notification Sent"
                            }))
                            .catch((err) => console.log({
                                message: "Notification Failed"
                            }))
                    })


                })
            console.log("news added successfully")
            res.json({
                message: "News Added Successfully"
            })
        })
        .catch((err) => {
            console.log("News Error " + err)
            res.json({
                message: "An error occured " + err
            })
        })
}


// add Ads
// const addAds = (req, res, next) => {
//     let input = {
//         username: req.body.username,
//         post: req.body.post,
//         url: req.body.url,
//         owner: req.body.owner,
//         likes: [],
//         duration: req.body.duration,
//         sponsored: true,
//         image: req.body.image,
//         university: req.body.university
//     }
//     if (req.file) {
//         input.src = `https://gigvee.s3.us-east-2.amazonaws.com/${uuidv4() + req.body.filename.trim()}`
//         input.srctype = req.file.mimetype

//         if (['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/gif', 'image/x-cmx', 'image/x-icon'].includes(req.file.mimetype)) {
//             sharp(req.file.path)
//                 .jpeg({ mozjpeg: true, quality: 85, })
//                 .toBuffer()
//                 .then(data => {
//                     const s3 = new aws.S3();
//                     const s3Params = {
//                         Bucket: S3_BUCKET,
//                         Key: input.src.slice(42),
//                         Body: data,
//                         // Expires: 180,
//                         ContentDisposition: "attachment;",
//                         ContentType: req.file.mimetype,
//                         ACL: 'public-read'
//                     };
//                     s3.putObject(s3Params, function (s3Err, data) {
//                         if (s3Err) throw s3Err

//                         console.log('File uploaded successfully at --> ' + data.Location)
//                         fs.unlink(req.file.path, (err) => {
//                             if (err) console.log('Unable to delete used file ' + err)
//                             else console.log('file deleted')
//                         })

//                     })
//                 })
//         } else {
//             fs.readFile(req.file.path, (err, data) => {
//                 if (err) throw err;
//                 const s3 = new aws.S3();
//                 const s3Params = {
//                     Bucket: S3_BUCKET,
//                     Key: input.src.slice(42),
//                     Body: data,
//                     // Expires: 180,
//                     ContentDisposition: "attachment;",
//                     ContentType: req.file.mimetype,
//                     ACL: 'public-read'
//                 };
//                 s3.putObject(s3Params, function (s3Err, data) {
//                     if (s3Err) throw s3Err

//                     console.log('File uploaded successfully at --> ' + data.Location)
//                     fs.unlink(req.file.path, (err) => {
//                         if (err) console.log('Unable to delete used file ' + err)
//                         else console.log('file deleted')
//                     })

//                 })

//             })
//         }
//     }

//     let post = new Post(input)

//     post.save()
//         .then((response) => {
//             res.json({
//                 message: "Ad Added Successfully"
//             })
//         })
//         .catch((err) => {
//             console.log("Ads Error")
//             res.json({
//                 message: "An error occured"
//             })
//         })
// }

// //add Ass
// const addAss = (req, res, next) => {
//     let input = {
//         username: req.body.username,
//         post: req.body.post,
//         likes: [],
//         owner: req.body.owner,
//         course: req.body.course,
//         email: req.body.email,
//         ass: true,
//         image: req.body.image,
//         verified: req.body.verified
//     }
//     if (req.file) {
//         input.src = `https://gigvee.s3.us-east-2.amazonaws.com/${uuidv4() + req.body.filename.trim()}`
//         input.srctype = req.file.mimetype

//         if (['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/gif', 'image/x-cmx', 'image/x-icon'].includes(req.file.mimetype)) {
//             sharp(req.file.path)
//                 .jpeg({ mozjpeg: true, quality: 85, })
//                 .toBuffer()
//                 .then(data => {
//                     const s3 = new aws.S3();
//                     const s3Params = {
//                         Bucket: S3_BUCKET,
//                         Key: input.src.slice(42),
//                         Body: data,
//                         // Expires: 180,
//                         ContentDisposition: "attachment;",
//                         ContentType: req.file.mimetype,
//                         ACL: 'public-read'
//                     };
//                     s3.putObject(s3Params, function (s3Err, data) {
//                         if (s3Err) throw s3Err

//                         console.log('File uploaded successfully at --> ' + data.Location)
//                         fs.unlink(req.file.path, (err) => {
//                             if (err) console.log('Unable to delete used file ' + err)
//                             else console.log('file deleted')
//                         })

//                     })
//                 })
//         } else {
//             fs.readFile(req.file.path, (err, data) => {
//                 if (err) throw err;
//                 const s3 = new aws.S3();
//                 const s3Params = {
//                     Bucket: S3_BUCKET,
//                     Key: input.src.slice(42),
//                     Body: data,
//                     // Expires: 180,
//                     ContentDisposition: "attachment;",
//                     ContentType: req.file.mimetype,
//                     ACL: 'public-read'
//                 };
//                 s3.putObject(s3Params, function (s3Err, data) {
//                     if (s3Err) throw s3Err

//                     console.log('File uploaded successfully at --> ' + data.Location)
//                     fs.unlink(req.file.path, (err) => {
//                         if (err) console.log('Unable to delete used file ' + err)
//                         else console.log('file deleted')
//                     })

//                 })

//             })
//         }
//     }

//     let post = new Post(input)

//     post.save()
//         .then((response) => {

//             Login.find()
//                 .then((respons) => {
//                     respons.forEach(dd => {
//                         let note = {
//                             notification: {
//                                 title: "Help with Assignment",
//                                 body: "Someone needs help with an assignment!"
//                             },

//                             apns: {
//                                 payload: {
//                                     aps: {
//                                         'mutable-content': 1
//                                     }
//                                 }
//                             },
//                             webpush: {
//                                 fcmOptions: {
//                                     link: "https://www.uniconne.com/home?oau=true"
//                                 }
//                             },
//                             token: dd.regToken
//                         }

//                         const notification_options = {
//                             priority: "high"
//                         }

//                         const regToken = respons.map(resp => resp.regToken)
//                         const message = note
//                         const options = notification_options

//                         admin.messaging().send(note)
//                             .then((re) => console.log({
//                                 message: "Notification Sent"
//                             }))
//                             .catch((err) => console.log({
//                                 message: "Notification Failed"
//                             }))
//                     })


//                 })

//             console.log("news added successfully")
//             res.json({
//                 message: "News Added Successfully"
//             })
//         })
//         .catch((err) => {
//             console.log("News Error " + err)
//             res.json({
//                 message: "An error occured " + err
//             })
//         })
// }

// // Add Tutorial
// const tutorial = (req, res, next) => {
//     let input = {
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         username: req.body.username,
//         post: req.body.post,
//         likes: [],
//         owner: req.body.owner,
//         course: req.body.course,
//         email: req.body.email,
//         tutorial: true,
//         price: req.body.price,
//         image: req.body.image,
//         verified: req.body.verified,
//         followers: []
//     }
//     if (req.body.verified === "undefined" || req.body.verified === null) {
//         input.verified = false
//     }
//     if (req.file) {
//         input.src = `https://gigvee.s3.us-east-2.amazonaws.com/${uuidv4() + req.body.filename.trim()}`
//         input.srctype = req.file.mimetype

//         if (['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/gif', 'image/x-cmx', 'image/x-icon'].includes(req.file.mimetype)) {
//             sharp(req.file.path)
//                 .jpeg({ mozjpeg: true, quality: 85, })
//                 .toBuffer()
//                 .then(data => {
//                     const s3 = new aws.S3();
//                     const s3Params = {
//                         Bucket: S3_BUCKET,
//                         Key: input.src.slice(42),
//                         Body: data,
//                         // Expires: 180,
//                         ContentDisposition: "attachment;",
//                         ContentType: req.file.mimetype,
//                         ACL: 'public-read'
//                     };
//                     s3.putObject(s3Params, function (s3Err, data) {
//                         if (s3Err) throw s3Err

//                         console.log('File uploaded successfully at --> ' + data.Location)
//                         fs.unlink(req.file.path, (err) => {
//                             if (err) console.log('Unable to delete used file ' + err)
//                             else console.log('file deleted')
//                         })

//                     })
//                 })
//         } else {
//             fs.readFile(req.file.path, (err, data) => {
//                 if (err) throw err;
//                 const s3 = new aws.S3();
//                 const s3Params = {
//                     Bucket: S3_BUCKET,
//                     Key: input.src.slice(42),
//                     Body: data,
//                     // Expires: 180,
//                     ContentDisposition: "attachment;",
//                     ContentType: req.file.mimetype,
//                     ACL: 'public-read'
//                 };
//                 s3.putObject(s3Params, function (s3Err, data) {
//                     if (s3Err) throw s3Err

//                     console.log('File uploaded successfully at --> ' + data.Location)
//                     fs.unlink(req.file.path, (err) => {
//                         if (err) console.log('Unable to delete used file ' + err)
//                         else console.log('file deleted')
//                     })

//                 })

//             })
//         }
//     }

//     let post = new Post(input)

//     post.save()
//         .then((response) => {

//             Login.find()
//                 .then((respons) => {
//                     respons.forEach(dd => {
//                         let note = {
//                             notification: {
//                                 title: "New Tutorial",
//                                 body: "Someone just posted a new tutorial!"
//                             },

//                             apns: {
//                                 payload: {
//                                     aps: {
//                                         'mutable-content': 1
//                                     }
//                                 }
//                             },
//                             webpush: {
//                                 fcmOptions: {
//                                     link: "https://www.uniconne.com/home?oau=true"
//                                 }
//                             },
//                             token: dd.regToken
//                         }

//                         const notification_options = {
//                             priority: "high"
//                         }

//                         const regToken = respons.map(resp => resp.regToken)
//                         const message = note
//                         const options = notification_options

//                         admin.messaging().send(note)
//                             .then((re) => console.log({
//                                 message: "Notification Sent"
//                             }))
//                             .catch((err) => console.log({
//                                 message: "Notification Failed"
//                             }))
//                     })


//                 })

//             console.log("news added successfully")
//             res.json({
//                 message: "News Added Successfully"
//             })
//         })
//         .catch((err) => {
//             console.log("News Error " + err)
//             res.json({
//                 message: "An error occured " + err
//             })
//         })
// }

//Buying
const buy = (req, res, next) => {
    Post.findById(req.body.postID)
        .then(post => {
            let payer = { followers: [...post.followers, req.body.userID] }
            Post.findByIdAndUpdate(req.body.postID, { $set: payer })
                .then(pos => {
                    Login.findById(post.owner)
                        .then(user => {
                            let final = post.price - Math.round((post.price / 100) * 10)
                            let tutor = { fees: user.fees + final }
                            Login.findByIdAndUpdate(post.owner, { $set: tutor })
                                .then(paid => {
                                    res.json({
                                        message: "Purchase Succesful",
                                        id: paid._id
                                    })
                                    console.log({
                                        message: "Purchase Succesful"
                                    })
                                    let note = {
                                        notification: {
                                            title: "Tutorial Purchase",
                                            body: `Someone just bought a tutorial you posted: ${post.post}`
                                        }
                                    }
        
                                    const notification_options = {
                                        priority: "high"
                                    }
                                    const regToken = paid.regToken
                                    const message = note
                                    const options = notification_options
        
                                    admin.messaging().sendToDevice(regToken, message, options)
                                        .then((re) => console.log({
                                            message: "Notification Sent"
                                        }))
                                        .catch((err) => console.log({
                                            message: "Notification Failed"
                                        }))
                                })
                                .catch(err => {
                                    res.json({
                                        message: "Purchase Failed"
                                    })
                                    console.log({
                                        message: "Purchase Failed"
                                    })
                                })
                            let note = {
                                    notification: {
                                        title: "Tutorial Purchase",
                                        body: `There's a new purchase on a tutorial you posted, congratulations`
                                    }
                                }
    
                            const notification_options = {
                                    priority: "high"
                                }
                                const regToken = user.regToken
                                const message = note
                                const options = notification_options
    
                                admin.messaging().sendToDevice(regToken, message, options)
                                    .then((re) => console.log({
                                        message: "Notification Sent"
                                    }))
                                    .catch((err) => console.log({
                                        message: "Notification Failed"
                                    }))
                        })
                })
        })

}

// delete Post
const deletePost = (req, res, next) => {
    let id = req.body.id
    Post.findByIdAndRemove(id)
        .then((response) => {
            if (response.sponsored) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'uniconneteam@gmail.com',
                        pass: 'JohnAlalade@4444'
                    }
                });

                var mailOptions = {
                    from: 'uniconneteam@gmail.com',
                    to: pos.email,
                    subject: 'Advert Deleted',
                    html: `<p>Hello ${response.username},</p> <p>This mail is to inform you that an advert you posted has just been deleted. This might be automatic due to expiration or you must hve deleted it from your dashoard.</p>
                    <p>You can always post more ads on Uniconne and reach more audience to promote your business.visit <a href="www.uniconne.com/ads">www.uniconne.com/ads</a></p>
                    <p>Kind regards..</p> <quote>~Uniconne Ads Manager</quote>`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("Emailimg error: " + error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                if (response.src) {
                    const s3 = new aws.S3();
                    const imgName = response.src.slice(42)
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

            console.log({
                message: "Post Deleted"
            })
            res.json({
                message: "Post Deleted"
            })
        })
        .catch((err) => {
            console.log({
                message: "An Error Occured " + err
            })
        })
}

// commenting
const commenting = (req, res, next) => {
    let postID = req.body.postID
    let comment = req.body.comment
    comment.id = uuidv4()
    let comments
    Post.findById(postID)
        .then((data) => {
            let comm = data.comments
            //console.log(comment)
            //console.log(comm)
            //console.log(comment)
            if (comm) {
                comments = [comment, ...comm]
            }
            else {
                comments = [comment]
            }

            let updatedPost = {
                comments: comments
            }
            console.log(updatedPost.comments)
            Post.findByIdAndUpdate(postID, { $set: updatedPost })
                .then((pos) => {
                    console.log({
                        message: "Comment Add Successfully"
                    })
                    
                })
                .catch(error => {
                    res.json({
                        message: "An Error Occured" + error
                    })
                })

        })
        .then(() => {
            res.json({
                message: "Comment Add Successfully"
            })
        })
        .catch(err => console.error("Error Ooo! " + err))
}

// Analysing
const analysis = (req, res, next) => {
    let postID = req.body.postID
    let comment = req.body.comment
    comment.id = uuidv4()
    let comments
    Post.findById(postID)
        .then((data) => {
            let comm = data.comments
            //console.log(comment)
            //console.log(comm)
            //console.log(comment)
            if (comm) {
                comments = [comment, ...comm]
            }
            else {
                comments = [comment]
            }

            let updatedPost = {
                analysis: comments
            }
            console.log(updatedPost.comments)
            Post.findByIdAndUpdate(postID, { $set: updatedPost })
                .then((pos) => {

                    Login.findById(data.owner)
                        .then((person) => {
                            let note = {
                                notification: {
                                    title: "New Comment On Post",
                                    body: `${comment.username} just made an analysis on your post: ${pos.post}`
                                }
                            }

                            const notification_options = {
                                priority: "high"
                            }
                            const regToken = person.regToken
                            const message = note
                            const options = notification_options

                            admin.messaging().sendToDevice(regToken, message, options)
                                .then((re) => console.log({
                                    message: "Notification Sent"
                                }))
                                .catch((err) => console.log({
                                    message: "Notification Failed"
                                }))
                        })

                    console.log({
                        message: "Comment Add Successfully"
                    })
                    res.json({
                        message: "Comment Add Successfully"
                    })
                })
                .catch(error => {
                    res.json({
                        message: "An Error Occured" + error
                    })
                })

        })
        .then(() => {
            res.json({
                message: "Comment Add Successfully"
            })
        })
        .catch(err => console.error("Error Ooo! " + err))
}


// const assCommenting = (req, res, next) => {
//     let postID = req.body.postID
//     let comment = {
//         comment: req.body.comment,
//         username: req.body.username,
//         src: req.body.src
//     }
//     if (req.file) {
//         comment.img = `https://gigvee.s3.us-east-2.amazonaws.com/${uuidv4() + req.body.filename.trim()}`
//         comment.srctype = req.file.mimetype
//         sharp(req.file.path)
//             .jpeg({ mozjpeg: true, quality: 85, })
//             .toBuffer()
//             .then(data => {
//                 const s3 = new aws.S3();
//                 const s3Params = {
//                     Bucket: S3_BUCKET,
//                     Key: comment.img.slice(42),
//                     Body: data,
//                     // Expires: 180,
//                     ContentDisposition: "attachment;",
//                     ContentType: req.file.mimetype,
//                     ACL: 'public-read'
//                 };
//                 s3.putObject(s3Params, function (s3Err, data) {
//                     if (s3Err) throw s3Err

//                     console.log('File uploaded successfully at --> ' + data.Location)
//                     fs.unlink(req.file.path, (err) => {
//                         if (err) console.log('Unable to delete used file ' + err)
//                         else console.log('file deleted')
//                     })

//                 })
//             })
//         // fs.readFile(req.file.path, (err, data) => {
//         //     if (err) throw err;
//         //     const s3 = new aws.S3();
//         //     const s3Params = {
//         //         Bucket: S3_BUCKET,
//         //         Key: comment.img.slice(42),
//         //         Body: data,
//         //         // Expires: 180,
//         //         ContentDisposition: "attachment;",
//         //         ContentType: req.file.mimetype,
//         //         ACL: 'public-read'
//         //     };
//         //     s3.putObject(s3Params, function (s3Err, data) {
//         //         if (s3Err) throw s3Err

//         //         console.log('File uploaded successfully at --> ' + data.Location)

//         //     })

//         // })
//     }

//     let comments
//     Post.findById(postID)
//         .then((data) => {
//             let comm = data.comments
//             //console.log(comment)
//             //console.log(comm)
//             //console.log(comment)
//             if (comm) {
//                 comments = [comment, ...comm]
//             }
//             else {
//                 comments = [comment]
//             }

//             let updatedPost = {
//                 comments: comments
//             }
//             console.log(updatedPost.comments)
//             Post.findByIdAndUpdate(postID, { $set: updatedPost })
//                 .then((pos) => {

//                     Login.findById(data.owner)
//                         .then((person) => {
//                             let note = {
//                                 notification: {
//                                     title: "Solution to assignment",
//                                     body: `${comment.username} just sent a solution to an assignment you posted`
//                                 }
//                             }

//                             const notification_options = {
//                                 priority: "high"
//                             }
//                             const regToken = person.regToken
//                             const message = note
//                             const options = notification_options

//                             admin.messaging().sendToDevice(regToken, message, options)
//                                 .then((re) => console.log({
//                                     message: "Notification Sent"
//                                 }))
//                                 .catch((err) => console.log({
//                                     message: "Notification Failed"
//                                 }))
//                         })

//                     if (pos.ass) {
//                         var transporter = nodemailer.createTransport({
//                             service: 'gmail',
//                             auth: {
//                                 user: 'uniconneteam@gmail.com',
//                                 pass: 'JohnAlalade@4444'
//                             }
//                         });

//                         var mailOptions = {
//                             from: 'uniconneteam@gmail.com',
//                             to: pos.email,
//                             subject: 'Uniconne Assignment Notification',
//                             html: `<p>Hello ${pos.username},</p> <p>Someone sent an answer to an assignment you posted earlier</p> 
//                             <p>${pos.post}</p> <br /> <a href="https://www.uniconne.com/profile?oau=true">Check it out</a> <p>Kind regards..</p> <quote>~John Alalade</quote>`
//                         };

//                         transporter.sendMail(mailOptions, function (error, info) {
//                             if (error) {
//                                 console.log("Emailimg error: " + error);
//                             } else {
//                                 console.log('Email sent: ' + info.response);
//                             }
//                         });
//                     }
//                     console.log({
//                         message: "Comment Add Successfully"
//                     })
//                     res.json({
//                         message: "Comment Add Successfully"
//                     })
//                 })
//                 .catch(error => {
//                     res.json({
//                         message: "An Error Occured" + error
//                     })
//                 })

//         })
//         .then(() => {
//             res.json({
//                 message: "Comment Add Successfully"
//             })
//         })
//         .catch(err => console.error("Error Ooo! " + err))
// }

// like
const like = (req, res, next) => {
    let like = req.body.like
    let postID = req.body.postID
    let likes
    Post.findById(postID)
        .then((data) => {
            let liking = data.likes
            //console.log(comment)
            const likefilter = (u) => {
                return u !== like
            }
            //console.log(comm)
            //console.log(comment)

            if (liking) {
                if (liking.indexOf(like) == -1) { likes = [like, ...liking] }
                else { likes = liking.filter(likefilter) }
            }
            else {
                likes = [like]
            }

            let updatedPost = {
                likes: likes
            }
            console.log(updatedPost.likes)

            Post.findByIdAndUpdate(postID, { $set: updatedPost })
                .then((pp) => {

                    // Login.findById(data.owner)
                    //     .then((person) => {
                            
                                
                    //     })

                    console.log({
                        message: "Like Added Successfully"
                    })
                    res.json({
                        message: "Like Added Successfully"
                    })
                })
                .catch(error => {
                    res.json({
                        message: "An Error Occured" + error
                    })
                })

        })
        .then(() => {
            res.json({
                message: "Like Added Successfully"
            })
        })
        .catch(err => console.error("Error Ooo! " + err))

}
module.exports = {
    indexPost, addPost, sharePost, addNews,  deletePost, showOne, commenting,  like, searchPost,  showPost, buy, analysis
}