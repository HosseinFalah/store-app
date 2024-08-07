/**
 * @swagger
 *  components:
 *      schemas:
 *          Update-Profile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the firstname of user
 *                      example: Hossein
 *                  last_name:
 *                      type: string
 *                      description: the last_name of user
 *                      example: Falah
 *                  username:
 *                      type: string
 *                      description: the username of user
 *                      example: hossein__falah-developer
 *                  email:
 *                      type: array
 *                      description: the email of user   
 *                      example: hosseinfalah2021@gmail.com
 */

/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "668ea5609a180b8e26ddb2c4"
 *                                  first_name:
 *                                      type: string
 *                                      example: "user first_name"
 *                                  last_name:
 *                                      type: string
 *                                      example: "user last_name"
 *                                  username:
 *                                      type: string
 *                                      example: "username"
 *                                  email:
 *                                      type: string
 *                                      example: "the user email hosseinfalah2021@gmail.com"
 *                                  mobile:
 *                                      type: string
 *                                      example: "09922477517"
 */

/**
 * @swagger
 *  /admin/user/list:
 *      get:
 *          tags: [Users(AdminPanel)]
 *          summary: get all users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in user first_name, last_name, username, mobile, email
 *          responses:
 *              201:
 *                  description: created new Product
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfUsers'
 */

/**
 * @swagger
 *  /admin/user/update-profile:
 *      patch:
 *          tags: [Users(AdminPanel)]
 *          summary: update user detail and profile
 *          requestBody:    
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */