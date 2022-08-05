const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 30
    },
    university: {
        type: String,
        required: [true, 'Please provide university name'],
        maxlength: 30
    },
    profile: {
        type: String
    },
    duration: {
        type: Number,
        required: [true, 'Please provide course duration']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
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
},{timestamps:true})


module.exports = mongoose.model('course', CourseSchema)