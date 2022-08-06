const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 30
    },
    profile: {
        type: String,
    },
    university: {
        type: String,
        required: [true, 'Please provide university name'],
        maxlength: 50
    },
    image: {
        type: String,
        required: [true, 'Please provide image url']
    },
    duration: {
        type: Number,
        required: [true, 'Please provide course duration']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
    },
    certificate: {
        type: String,
        required: [true, 'Please provide certificate url']
    },
    criteria: {
        type: String,
        required: [true, 'Please provide criteria']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'Please provide user'],
    }
}, { timestamps: true }) 

module.exports = mongoose.model('course', CourseSchema)