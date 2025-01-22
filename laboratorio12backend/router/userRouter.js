//Importar express  para crear las rutas de las acciones del controlador
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/user/login", userController.getLogin);

//Exporto las variables que quiero que sean accedidas de esta clase
module.exports=router;