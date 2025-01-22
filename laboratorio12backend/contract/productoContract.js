/**
 * @swagger
 * tags:
 *   name: API Producto
 *   description: API con las operaciones CRUD para Producto
 * definitions:
 *   Producto:
 *     title: Producto
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: ID único del producto
 *       nombre:
 *         type: string
 *         description: Nombre del producto
 *       precio:
 *         type: number
 *         format: double
 *         description: Precio del producto
 *       estado:
 *         type: boolean
 *         description: Estado del producto
 *       descripcion:
 *         type: string
 *         description: Descripión del producto
 *   ListaProducto:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Producto'
 */

/**
 * @swagger
 * /api/producto:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [API Producto]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         schema:
 *               $ref: '#/definitions/ListaProducto'
 *       400:
 *         description: Error interno de la aplicación al listar productos
 *       500:
 *         description: Error interno del servidor al listar productos
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [API Producto]
 *     parameters:
 *       - in: body
 *         name: producto
 *         description: Información del producto a crear
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *               description: Nombre del producto
 *             precio:
 *               type: number
 *               format: double
 *               description: Precio del producto
 *             estado:
 *               type: boolean
 *               description: Estado del producto
 *             descripcion:
 *               type: string
 *               description: Descripción del producto
 *     responses:
 *       200:
 *         description: Producto registrado exitosamente
 *         schema:
 *            $ref: '#/definitions/Producto'
 *       400:
 *         description: Error interno de la aplicación al guarda un producto
 *       500:
 *         description: Error interno del servidor al guarda un producto
 *
 * /api/producto/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     tags: [API Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a obtener
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *         schema:
 *               $ref: '#/definitions/Producto'
 *       400:
 *         description: Error interno de la aplicación al obtener un producto
 *       500:
 *         description: Error interno del servidor al obtener un producto
 *   put:
 *     summary: Actualizar un producto por su ID
 *     tags: [API Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a actualizar
 *         required: true
 *         type: integer
 *       - in: body
 *         name: producto
 *         description: Información del producto actualizado
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Producto'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         schema:
 *               $ref: '#/definitions/Producto'
 *
 *   delete:
 *     summary: Eliminar un producto por su ID
 *     tags: [API Producto]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a eliminar
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *         schema:
 *               $ref: '#/definitions/Producto'
 * 
 * /api/producto/activos:
 *   get:
 *     summary: Obtener todos los productos activos
 *     tags: [API Producto]
 *     responses:
 *       200:
 *         description: Lista de productos activos
 *         schema:
 *               $ref: '#/definitions/ListaProducto'
 * 
 * /api/producto/desactivos:
 *   get:
 *     summary: Obtener todos los productos desactivos
 *     tags: [API Producto]
 *     responses:
 *       200:
 *         description: Lista de productos desactivos
 *         schema:
 *               $ref: '#/definitions/ListaProducto'
 */

