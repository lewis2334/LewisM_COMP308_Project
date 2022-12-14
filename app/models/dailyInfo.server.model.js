// Import the mongoose library for interacting with MongoDB
const mongoose = require("mongoose");

// Create a new schema for storing daily health information
const Schema = mongoose.Schema;
const DailyInfoSchema = new Schema({
// Pulse rate is a number
pulseRate: Number,
// Blood pressure is a string
bloodPressure: String,
// Weight is a number
weight: Number,
// Temperature is a number
temperature: Number,
// Respiratory rate is a number
respiratoryRate: Number,
// Last modified date is a date object
lastModified: Date,
// Owner is a reference to a user object
owner: {
type: Schema.Types.ObjectId,
ref: "User",
},
// Created date is a date object with a default value of the current date
created: {
type: Date,
default: Date.now,
},
});

// Set options for converting the schema to JSON
DailyInfoSchema.set("toJSON", {
getters: true,
virtuals: true,
});

// Create a model based on the schema
mongoose.model("DailyInfo", DailyInfoSchema);