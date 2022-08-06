const Course = require('../models/Course');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, Forbidden } = require('../errors');


//create course
const createCourse = async (req, res) => {
    req.body.createdBy = req.user.id
    const course = await Course.create(req.body)
    res.status(StatusCodes.CREATED).json({ msg: 'Created Successfully' })
}

//get a single course using course id
const getCourse = async (req, res) => {
    const course = await Course.findOne({ _id: req.params.id })
    if (!course) throw new NotFoundError(`No course with id ${req.params.id}`)

    res.status(StatusCodes.OK).json({ course })
}

//get all courses
const getAllCourses = async (req, res) => {
    const { createdBy, university } = req.query;
    let query = {};
    if (createdBy) query.createdBy = createdBy;
    if (university) query.university = university;

    const courses = await Course.find(query);
    res.status(StatusCodes.OK).json({ courses });
}

//update course with id
const updateCourse = async (req, res) => {
    const course = await Course.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id },
        req.body, { new: true, runValidators: true })
    if (!course) throw new NotFoundError(`No course with id ${req.params.id}`)

    res.status(StatusCodes.OK).json({ msg: 'Updated Successfully' })
}


//delete course using id
const deleteCourse = async (req, res) => {
    const course = await Course.findOneAndDelete({ createdBy: req.user.id, _id: req.params.id })
    if (!course) throw new NotFoundError(`No course with id ${req.params.id}`)

    res.status(StatusCodes.OK).json({ msg: 'deleted Successfully' })
}

module.exports = {
    createCourse,
    getCourse,
    getAllCourses,
    updateCourse,
    deleteCourse
}