/**
 * @swagger
 * tags:
 *   name: API User
 *   description: API con las operaciones CRUD para User y logeo al sistema
 * definitions:
 *   User:
 *     title: User
 *     type: object
 *     properties:
 *       idusuario:
 *         type: integer
 *         description: ID único del usuario
 *       usuario:
 *         type: string
 *         description: Nombre del usuario
 *       password:
 *         type: string
 *         format: binary 
 *         description: Contraseña del usuario
 *   ListaUser:
 *     type: array
 *     items:
 *       $ref: '#/definitions/User'
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Logearce al sistema
 *     tags: [API User]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: Información del user a logear
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *               usuario:
 *                  type: string
 *                  description: Nombre del usuario
 *               password:
 *                  type: string
 *                  description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Logeo exitoso
 *         schema:
 *               $ref: '#/definitions/User'
 *       500:
 *         description: Error interno del servidor al logearce
 */