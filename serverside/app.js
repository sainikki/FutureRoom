const express = require('express');
const mongoose = require('mongoose');

const Event = require('./models/event')



  mongoose.connect('mongodb+srv://capstone:thisiscapstone@cluster0-xutue.mongodb.net/conference_db', { useNewUrlParser: true })
 .then(() => { console.log("connected"); })
 .catch(() => { console.log("error connecting"); });

const app = express();
// use the following code on any request that matches the specified mount path
app.use((req, res, next) => {
   console.log('This line is always called');
   res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS'); //allowable methods
   res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
   next();
});
// app.get('/events', (req, res, next) => {
//   const events = [ 
//     {// "id" : "1",
//     "end_time":"7:45",
//     // "summary":"Test Event 04","start_time":"14:00","end_time":"15:00",
//     // "start_date":"2019-10-04","end_date":"2019-10-04"}
//     }];

// //send the array as the response 
//    res.json(events);

// });


app.get('/event', (req, res, next) => {
   //call mongoose method find (MongoDB db.Events.find())
   console.log("in app.js");
    Event.find()
     //if data is returned, send data as a response
     .then(data => res.status(200).json(data))
     //if error, send internal server error
     .catch(err => {
     console.log('Error: ${err}');
     res.status(500).json(err);
    });
 });

//to use this middleware in other parts of the application
module.exports=app;
