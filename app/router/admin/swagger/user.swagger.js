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
 *                              $ref: '#/definitions/publicDefinition'
 */