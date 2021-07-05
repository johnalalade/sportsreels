const Product = require('../Models/QuoteModel')
const fs = require('fs');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { OutgoingMessage } = require('http');

const S3_BUCKET = "gigvee";
aws.config.region = 'us-east-2'

// show list of all available Quote

const indexQuote = (req, res, next) => {
    Product.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: "An error occured: "+ error
        })
    })
}


// add Quote 

const storeQuote = (req, res, next) => {
    let user = {
        product: req.body.product,
        description: req.body.description,
        price: req.body.price
    }
    if(req.file){
        user.img = `https://gigvee.s3.us-east-2.amazonaws.com/${uuidv4()}`

        fs.readFile(req.file.path, (err, data) => {
            if (err) throw err;
            const s3 = new aws.S3();
            const s3Params = {
                Bucket: S3_BUCKET,
                Key: user.img.slice(42),
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

    let product = new Product(user)
    product.save()
    .then(response => {
        res.json({
            message: "Product Added Succecfully",
            response
        })
        console.log({
            message: "Product Added Succecfully"
        })
    })
    .catch(error => {
        res.json({
            message: "An Error Occured"
        })
        console.log({
            message: "An Error Occured"
        })
    })
}

// Mail
const mail = (req, res, next) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'uniconneteam@gmail.com',
            pass: 'JohnAlalade@4444'
        }
    });

    var mailOptions = {
        from: 'uniconneteam@gmail.com',
        to: req.body.email,
        subject: 'Order Sent',
        html: `<br/> <p>Hello ${req.body.name},</p> <p>Thnaks for ordering a purchase, this mail is to let you know your order has been sent to Mr. Victor.</p> <p>You can also chat him up on WhatsApp, just <a href="https://wa.me/+2348069965604?text=Hello Mr. Victor, I just want to confirm my order of ${req.body.product}">Click Here</a> </p> <p>Thank you once again.</p> <p>Kind regards..</p> <quote>~Victor Luxury</quote>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Emailimg error: " + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// delete Quote

const deleteQuote = (req, res, next) => {
    let id = req.body.id
    Product.findByIdAndRemove(id)
    .then((response) => {
        const s3 = new aws.S3();
            const imgName = response.img.slice(42)
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
        res.json({
            message: "Post Deleted",
            response
        })
    })
    .catch(() => {
        res.json({
            message: "An Error Occured"
        })
    })
}


module.exports = {
    deleteQuote, storeQuote, indexQuote, mail
}