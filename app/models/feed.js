const mongoose = require("mongoose");

// Define Feed Schema
const feedSchema = new mongoose.Schema({
    Name:String,
    Description:String,
    Date:Date,
    EndDate:Date,
    })
// Compile our Model based on the Schema
const Feed = mongoose.model("Feed;", feedSchema);

// Export our Model for use
module.exports = Feed;