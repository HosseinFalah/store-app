const { Router } = require("express");
const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");

const router = Router();

router.put(`/add`, ChapterController.addChapter); //create new chapter
router.get(`/list/:courseID`, ChapterController.getAllChaptersOfCourse); // get all chapters of course
router.patch(`/remove/:chapterID`, ChapterController.removeChapterById); // remove chapter of course
router.patch(`/update/:chapterID`, ChapterController.updateChapterById);

module.exports = {
    ChapterAdminApiRoutes: router
}