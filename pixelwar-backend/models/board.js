const mongoose = require("mongoose");
const { Schema } = mongoose;

const Board = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 16
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    startAt: Date,
    endAt: Date,
    resolution: {
        x: {
            type: Number,
            required: true,
            min: 1,
            max: 1000
        },
        y: {
            type: Number,
            required: true,
            min: 1,
            max: 1000
        }
    },
    colors: [{
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^#[0-9A-F]{6}$/i.test(v);
            },
            message: props => `${props.value} is not a valid color`
        }
    }]
})

module.exports = mongoose.model("Board", Board);