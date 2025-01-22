-- PARA CREAR UNA BD
CREATE DATABASE sistemaventa;
-- PARA USAR LA BD CREADA
USE sistemaventa;
-- PARA CREAR TABLAS
CREATE TABLE `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(20) NOT NULL,
  `password` tinyblob NOT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
CREATE TABLE `cliente` (
  `idCliente` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` decimal(18,2) NOT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
-- PARA UN USUARIO EN UNA TABLA
INSERT INTO usuario (idusuario,usuario,password) VALUES (1, 'jperezgil', AES_ENCRYPT('admin','IDAT'));
-- PARA HABILITAR QUE EL USUARIO PUEDA FUNCIAR EN NODE.JS
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;
-- CONSULTAS ADICIONALES 
-- SELECT *,AES_DECRYPT(password,'IDAT') FROM usuario WHERE idusuario=1 AND password=AES_ENCRYPT('admin','IDAT');
-- DELETE FROM usuario WHERE idusuario=1 