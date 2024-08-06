const { Router } = require('express');
const { uploadFile } = require('../../utils/multer');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { CourseController } = require('../../http/controllers/admin/course/course.controller');

const router = Router();

router.get(`/list`, CourseController.getAllCourse); //get all course
router.post(`/add`, uploadFile.single('image'), stringToArray('tags'), CourseController.addCourse) //create new course
router.get(`/:id`, CourseController.getCourseById); //get all course
router.patch(`/update/:id`, uploadFile.single("image"), CourseController.updateCourseById); //edit a course
// router.put() //create new episode
// router.delete() //remove a course

// router.get() //get a course

module.exports = {
    CourseAdminApiRoutes: router
}