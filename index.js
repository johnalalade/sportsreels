const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const userRoute = require('./Routes/UserRoutes');
const postRoute = require('./Routes/PostRoutes');

const port = process.env.PORT || 5000


// const router = require('./router');
const uri = process.env.ATLAS_URI
mongoose.connect('mongodb+srv://John:John4444@cluster0.9bf4e.mongodb.net/Sportsreels?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})


db.once('open', () =>{
  console.log('Database connection Established')
})

const app = express();
const server = http.createServer(app); 


app.use(cors());
// app.use(router);

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

// serve static asset if in production
if(process.env.NODE_ENV === 'production') { 
  // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


server.listen(port, () => console.log(`Server has started.on port ${port}$`));

// app.use('/', profileRoute)
app.use('/', userRoute)
app.use('/', postRoute)



const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-east-2'