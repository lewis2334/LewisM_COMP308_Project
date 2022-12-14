// Import mongoose and the Schema class
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create AlertSchema with fields for message, unread status, owner, and creation date
const AlertSchema = new Schema({
message: {
type: String, // Field type is string
required: "Message is required" // Field is required
},
unread: Boolean, // Field is a boolean value
owner: {
type: Schema.Types.ObjectId, // Field type is an object ID
ref: "User" // Reference the User model
},
created: {
type: Date, // Field type is date
default: Date.now // Set default value to current date and time
}
});

// Set getters and virtuals for toJSON method
AlertSchema.set("toJSON", {
getters: true,
virtuals: true
});

// Create model for Alert schema and export it
mongoose.model("Alert", AlertSchema);