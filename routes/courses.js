const express = require('express')
const router = express.Router()

const {
    createCourse,
    getCourse,
    getAllCourses,
    updateCourse,
    deleteCourse
} = require('../controllers/courses')

router.route('/').post(createCourse).get(getAllCourses)  
router.route('/:id').get(getCourse).patch(updateCourse).delete(deleteCourse)

module.exports = router