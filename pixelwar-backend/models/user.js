const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    nickname: {
        type: String,
        maxlength: 20,
        minlength: 4,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    },
    // contributions is a map of boardId -> pixels
    contributions: {
        type: Map,
        of: Number,
        default: {}
    },
    bio: {
        type: String,
        maxlength: 1024
    }
})

module.exports = mongoose.model("User", User);