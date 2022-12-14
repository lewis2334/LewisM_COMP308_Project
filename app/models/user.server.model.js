const mongoose = require("mongoose"); // Import mongoose library
const crypto = require("crypto"); // Import crypto library
const Schema = mongoose.Schema; // Create a Schema variable

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    unique: true,
    required: "Username is required",
  },
  password: {
    type: String,
    validate: [(password) => password.length >= 6, "Password Should be Longer"],
  },
  role: {
    type: String,
    required: "Role is required",
  },
  LastLoggedIn: Date,
  verified: Boolean,
  salt: {
    type: String,
  },
  provider: {
    type: String,
    // Validate 'provider' value existance
    required: "Provider is required",
  },
  providerId: String,
  providerData: {},
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString("base64"), "base64");
    this.password = this.hashPassword(this.password);
  }
  next();
});

UserSchema.methods.hashPassword = function (password) {
  //console.log(crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex'))
  return crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha1")
    .toString("hex");
};

UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

UserSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

mongoose.model("User", UserSchema);
