const { Router } = require("express");
const { EpisodeController } = require("../../http/controllers/admin/course/episode.controller");
const { uploadVideo } = require("../../utils/multer");

const router = Router();

router.post('/add', uploadVideo.single('video'), EpisodeController.addNewEpisode);
router.delete(`/remove/:episodeID`, EpisodeController.removeEpisodeById);
router.patch(`/update/:episodeID`, uploadVideo.single('video'), EpisodeController.updateEpisodeById);

module.exports = {
    EpisodeAdminApiRoutes: router
}