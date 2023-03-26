const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    "email": {type: String, required: true},
    "pass": {type: String, required: true},
    "location": String
})

const UserModel = mongoose.model("user", userSchema);

module.exports = {UserModel}