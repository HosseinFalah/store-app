/**
 * @swagger
 *  components:
 *      schemas:
 *          Permissions:
 *              type: string
 *              enum:
 *                  -   blog
 *                  -   course
 *                  -   product
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Permission:
 *              type: object
 *              required:
 *                  -   name
 *                  -   description
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the name of permission
 *                  description:
 *                      type: string
 *                      description: the description of permission
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Permission:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the name of permission
 *                  description:
 *                      type: string
 *                      description: the description of permission
 */

/**
 * @swagger
 *  definitions:
 *      ListOfPermissions:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      permissions:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: 66a659eb7a59157e398be50e
 *                                  name:
 *                                      type: string
 *                                      example: "name of permission"
 *                                  description:
 *                                      type: string
 *                                      description: the description of permission
 * 
 */

/**
 * @swagger
 *  /admin/permission/list:
 *      get:
 *          tags: [Roles(AdminPanel)]
 *          summary: get all permission
 *          responses:
 *              200:
 *                  description: get all permissions
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfPermissions'
 */

/**
 * @swagger
 *  /admin/permission/add:
 *      post:
 *          tags: [Roles(AdminPanel)]
 *          summary: create new permission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Permission'
 *          responses:
 *              201:
 *                  description: created new Permission
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/permission/update/{id}:
 *      patch:
 *          tags: [Roles(AdminPanel)]
 *          summary: edit the permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Permission'
 *          responses:
 *              200:
 *                  description: Update The permission
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/permission/remove/{id}:
 *      delete:
 *          tags: [Roles(AdminPanel)]
 *          summary: remove the permission
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: remove new permission
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */