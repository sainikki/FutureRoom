const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema
  const eventSchema = new mongoose.Schema({
   // id:{type:int,required:true},
  //  location:  { type: String, required: true},
   location : { type: String, required: false},
   end_time: { type: String, required: false},
   startdate: {type: Date,required:false},
   enddate: {type: Date,required:false},
   summary:  { type: String, required: true},
   start_time:  { type: String, required: false},

 });



//use the blueprint to create the model
// Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model
module.exports = mongoose.model('Event', eventSchema,'event');
//note capital S in the collection name
