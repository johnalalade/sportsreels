const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// import route file
const userRoute = require('./Routes/QuoteRoutes')

// Setting port number
const port = process.env.PORT || 5000

// Setting up connection to mongoDB
mongoose.connect('mongodb+srv://John:John@cluster0.ymjzv.mongodb.net/QuoteBlog?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
const db = mongoose.connection

db.on('error', (err) => {
  console.log('DB error')
})


db.once('open', () =>{
  console.log('Database connection Established')
})

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', userRoute)


// serve static asset if in production
if(process.env.NODE_ENV === 'production') { 
    // set static folder
      app.use(express.static('client/build'));
  
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
      });
  }
  
//   Starting the server
server.listen(port, () => console.log(`Server has started.on port ${port}$`));
  