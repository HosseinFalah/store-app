/**
 * @swagger
 *  definitions:
 *      ListOfRoles:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      role:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: 66a659eb7a59157e398be50e
 *                                  title:
 *                                      type: string
 *                                      example: "title of role"
 *                                  permission:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id:
 *                                                  type: string
 *                                                  example: 66a659eb7a59157e398be50e
 *                                              title:
 *                                                  type: string
 *                                                  example: "title of role"
 *                                              description:
 *                                                  type: string
 *                                                  example: "describe the permission"
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the firstname of user
 *                  permissions:
 *                      type: array
 *                      description: the permissionsID of role
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the firstname of user
 *                  permissions:
 *                      type: array
 *                      description: the permissionsID of role
 */

/**
 * @swagger
 *  /admin/role/list:
 *      get:
 *          tags: [Roles(AdminPanel)]
 *          summary: get all roles
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfRoles'
 */

/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [Roles(AdminPanel)]
 *          summary: create new Role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Role'
 *          responses:
 *              201:
 *                  description: create new Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/role/update/{id}:
 *      patch:
 *          tags: [Roles(AdminPanel)]
 *          summary: edit the Role
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
 *                          $ref: '#/components/schemas/Edit-Role'
 *          responses:
 *              200:
 *                  description: Update The Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/role/remove/{field}:
 *      delete:
 *          tags: [Roles(AdminPanel)]
 *          summary: remove the Role
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: remove new Role
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */