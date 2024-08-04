const path = require('path');
const createHttpError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const { default: getVideoDurationInSeconds } = require('get-video-duration');

const Controller = require("../../controller");
const { getTime, deleteInvalidPropertyInObject, copyObject } = require('../../../../utils/functions');
const CourseModel = require('../../../../models/courses.model');
const { createEpisodeSchema } = require("../../../validators/admin/course.schema");
const { ObjectIdValidator } = require('../../../validators/public.validator');

class EpisodeController extends Controller {
    async addNewEpisode(req, res, next) {
        try {
            const { title, text, type, chapterID, courseID, filename, fileUploadPath } = await createEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, '/');
            const videoURL = `${process.env.BASE_URL}:${process.env.PORT}/${videoAddress}`;
            const seconds = await getVideoDurationInSeconds(videoURL);
            const time = getTime(seconds);
            const episode = { title, text, type, time, videoAddress };
            const craeteEpisodeResult = await CourseModel.updateOne({ _id: courseID, "chapters._id": chapterID}, {
                $push: {
                    "chapters.$.episodes": episode
                }
            });
            if (craeteEpisodeResult.modifiedCount == 0) throw new createHttpError.InternalServerError("افزودن اپیزود انجام نشد");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "افزودن اپیزود با موفقعیت انجام شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async removeEpisodeById(req, res, next) {
        try {
            const { id: episodeID } = await ObjectIdValidator.validateAsync({ id: req.params.episodeID });
            await this.getOneEpisode(episodeID);
            const removeEpisodeResult = await CourseModel.updateOne({
                "chapters.episodes._id": episodeID
            }, {
                $pull: {
                    "chapters.$.episodes": {
                        _id: episodeID
                    }
                }
            });
            if (removeEpisodeResult.modifiedCount == 0) throw new createHttpError.InternalServerError("حذف اپیزود انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "حذف اپیزود با موفقعیت انجام شد"
                }
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async updateEpisodeById(req, res, next) {
        try {
            const { id: episodeID } = await ObjectIdValidator.validateAsync({ id: req.params.episodeID });
            const episode = await this.getOneEpisode(episodeID);
            
            const { filename, fileUploadPath } = req.body;
            let blackListFields = ["_id"];

            if (filename && fileUploadPath) {
                const fileAddress = path.join(fileUploadPath, filename);
                req.body.videoAddress = fileAddress.replace(/\\/g, '/');
                const videoURL = `${process.env.BASE_URL}:${process.env.PORT}/${req.body.videoAddress}`;
                const seconds = await getVideoDurationInSeconds(videoURL);
                req.body.time = getTime(seconds);
                blackListFields.push("filename");
                blackListFields.push("fileUploadPath")
            } else {
                blackListFields.push("time");
                blackListFields.push("videoAddress")
            }
            const data = req.body;
            
            deleteInvalidPropertyInObject(data, blackListFields);

            const newEpisode = {
                ...episode,
                ...data
            };
            
            const updateEpisodeResult = await CourseModel.updateOne({
                "chapters.episodes._id": episodeID
            }, {
                $set: {
                    "chapters.$.episodes": newEpisode
                }
            });
            if (!updateEpisodeResult.modifiedCount) throw new createHttpError.InternalServerError("ویرایش اپیزود انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "ویرایش اپیزود با موفقعیت انجام شد"
                }
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getOneEpisode(episodeID) {
        const course = await CourseModel.findOne({ "chapters.episodes._id": episodeID });
        if (!course) throw new createHttpError.NotFound('اپیزودی یافت نشد');
        const episode = await course?.chapters?.[0]?.episodes?.[0];
        if (!episode) throw new createHttpError.NotFound('اپیزودی یافت نشد');
        return copyObject(episode);
    }
}

module.exports = {
    EpisodeController: new EpisodeController()
}