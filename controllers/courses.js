const Course = require('../models/Course');
const { StatusCodes } = require('http-status-codes')


//create course
const createCourse = async (req, res) => {
    const course = await Course.create(req.body)
    res.status(StatusCodes.OK).json({ msg: 'Created Successfully' })
}

//get a single course using course id
const getCourse = async (req, res) => {
    const course = await Course.findOne({ _id: req.params.id })
    if (!course) {
        res.status(StatusCodes.NOT_FOUND).json({ 
            msg: `No course with id ${req.params.id}` 
        })
    }

    res.status(StatusCodes.OK).json({ course })
}

//get all courses
const getAllCourses = async (req, res) => {
    const courses = await Course.find()
    res.status(StatusCodes.OK).json({ courses });
}

//update course with id
const updateCourse = async (req, res) => {
    
    const course = await Course.findOneAndUpdate({
        _id:req.params.id}, 
        req.body, 
        {new:true
    })

    if(!course) {
        res.status(StatusCodes.NOT_FOUND).json({ 
            msg: `No course with id ${req.params.id}` 
        })
    }

    res.status(StatusCodes.OK).json({msg:'Update Successfully'});
}


//delete course using id
const deleteCourse = async (req, res) => {
    res.send('delete course');
}

module.exports = { 
    createCourse, 
    getCourse, 
    getAllCourses, 
    updateCourse, 
    deleteCourse 
}