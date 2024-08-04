/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   video
 *                  -   type
 *              properties:
 *                  courseID:
 *                      type: string
 *                      example: 66a659eb7a59157e398be50e
 *                  chapterID:
 *                      type: string
 *                      example: 66a659eb7a59157e398be50e
 *                  title:
 *                      type: string
 *                      descripion: the title of episode
 *                      example: video number 1  - for example variable
 *                  text:
 *                      type: string
 *                      description: the description about this episode
 *                      example: the title about this episode
 *                  type:
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   lock
 *                          -   unlock
 *                  video:
 *                      type: string
 *                      description: the file of video (HH:mm:ss)
 *                      format: binary
 *          EditEpisode:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      descripion: the title of episode
 *                      example: video number 1  - for example variable
 *                  text:
 *                      type: string
 *                      description: the description about this episode
 *                      example: the title about this episode
 *                  type:
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   lock
 *                          -   unlock
 *                  video:
 *                      type: string
 *                      description: the file of video (HH:mm:ss)
 *                      format: binary
 */

/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags: [Episode(AdminPanel)]
 *          summary: create new chapter of course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/episode/remove/{episodeID}:
 *      delete:
 *          tags: [Episode(AdminPanel)]
 *          summary: remove episode of chapter
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/episode/update/{episodeID}:
 *      patch:
 *          tags: [Episode(AdminPanel)]
 *          summary: edit episode of chapter
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/EditEpisode'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */