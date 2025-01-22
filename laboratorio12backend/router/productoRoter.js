const express = require('express');
const router = express.Router();
const productoController = require("../controller/productoController");

router.post("/producto",productoController.crearProducto);
router.put("/producto/:id",productoController.actualizarProducto);
router.delete("/producto/:id",productoController.eliminarProducto);
router.get("/producto",productoController.listarProductos);
router.get("/producto/activos",productoController.listarProductosActivos);
router.get("/producto/desactivos",productoController.listarProductosDesactivos);
router.get("/producto/:id",productoController.obtenerProducto);

module.exports=router;
