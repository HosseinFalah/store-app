/**
 * @swagger
 *  definitions:
 *      getAllCourse:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "66a659eb7a59157e398be50e"
 *                                  title:
 *                                      type: string
 *                                      example: "title of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "the short_text of course"
 *                                  text:
 *                                      type: string
 *                                      example: "the text of course"
 *                                  status:
 *                                      type: string
 *                                      example: "noStarted | Completed | Holding"
 *                                  time:
 *                                      type: string
 *                                      example: "01:22:34"
 *                                  price:
 *                                      type: integer
 *                                      example: "2500000"
 *                                  discount:
 *                                      type: integer
 *                                      example: "20"
 *                                  studentCount:
 *                                      type: integer
 *                                      example: "340"
 *                                  teacher:
 *                                      type: string
 *                                      example: "hossein__falah"
 */