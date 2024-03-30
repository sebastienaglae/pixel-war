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
    contributions: [{
        board: {
            type: Schema.Types.ObjectId,
            ref: "Board"
        },
        pixels: Number
    }],
    theme: {
        type: String,
        default: "white",
        required: true,
        enum: ["white", "dark"]
    }
})

module.exports = mongoose.model("User", User);