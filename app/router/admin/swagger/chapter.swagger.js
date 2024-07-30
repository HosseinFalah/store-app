/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      example: "66a659eb7a59157e398be50e"
 *                  title:
 *                      type: string
 *                      example: chapter 1 zero hero javascript
 *                  text:
 *                      type: string
 *                      example: the describe about this chapter
 *          EditChapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: chapter 1 zero hero javascript
 *                  text:
 *                      type: string
 *                      example: the describe about this chapter
 */

/**
 * @swagger
 *  definitions:
 *      chapterOfCourseDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: 66a659eb7a59157e398be50e
 *                              title:
 *                                  type: string
 *                                  example: title of course
 *                              chapters:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                  example: [{ _id: '66a659eb7a59157e398be50e', title: "title of course", text: "text of course"}]
 */

/**
 * @swagger
 *  /admin/chapter/add:
 *      put:
 *          tags: [Chapter(AdminPanel)]
 *          summary: create new chapter for course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
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
 *  /admin/chapter/list/{courseID}:
 *      get:
 *          tags: [Chapter(AdminPanel)]
 *          summary: get all chapters of course
 *          parameters:
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/chapterOfCourseDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/remove/{courseID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: remove a chapter of course
 *          parameters:
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/chapterOfCourseDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/update/{courseID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: update detail of course
 *          parameters:
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/chapterOfCourseDefinition'
 */