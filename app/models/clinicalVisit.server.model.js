// require mongoose
const mongoose = require("mongoose");

// get the Schema object from mongoose
const Schema = mongoose.Schema;

// create the ClinicalVisit schema
const ClinicalVisitSchema = new Schema({
// bodyTemperature field is a number
bodyTemperature: Number,

// heartRate field is a number
heartRate: Number,

// bloodPressure field is a string
bloodPressure: String,

// respiratoryRate field is a number
respiratoryRate: Number,

// nurse field is an ObjectId of the user
nurse: {
type: Schema.Types.ObjectId,
ref: "User",
},

// patient field is an ObjectId of the user
patient: {
type: Schema.Types.ObjectId,
ref: "User",
},

// created field is a date and has a default value of current date
created: {
type: Date,
default: Date.now,
},
});

// enable getters and virtuals when converting to JSON
ClinicalVisitSchema.set("toJSON", {
getters: true,
virtuals: true,
});

// create the ClinicalVisit model using the ClinicalVisit schema
mongoose.model("ClinicalVisit", ClinicalVisitSchema);