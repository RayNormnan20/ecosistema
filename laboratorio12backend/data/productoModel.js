const dataType = require('sequelize');
const conexion = require("./conexion");

//Definimos el objeto relacional a la tabla en la BD
const producto=conexion.define('producto', {
    //Definimos los atributos
    nombre: {
        type: dataType.STRING,
        allowNull: false
    },
    precio: {
        type: dataType.FLOAT,
        allowNull: false,
    },
    estado: {
        type: dataType.BOOLEAN,
        allowNull: false,
    },
    descripcion: {
        type: dataType.TEXT,
        allowNull: true,
    }
}, {
    // Especifica el nombre de la tabla en la base de datos
    tableName: 'producto',
});

// Sincronizar la tabla con la base de datos [para que borre la data que se esta almacenando { force: true }]
producto.sync();

const productoModel = {    
     crearProducto: async(nombre, precio, estado, descripcion) => {
        let resultado = null;
        try {
            resultado = await producto.create({ nombre, precio, estado, descripcion });
            console.log(resultado);
        } catch (exception) {
            console.error('Error en crearProducto Model:', exception);
            resultado = null;
            
        }
        return resultado;
    },
    
    actualizarProducto: async(id,nombre, precio, estado, descripcion) => {
        let resultado = null;
        try {
            resultado = await producto.findByPk(id);
            if(resultado!=null){
                resultado = await resultado.update({ nombre, precio, estado, descripcion });
            }       
            console.log(resultado);
        } catch (exception) {
            console.error('Error en actualizarProducto Model:', exception);
            resultado = null;
        }
        return resultado;
    },

    eliminarProducto: async(id) => {
        let resultado = null;
        try {
            resultado = await producto.findByPk(id);
            if(resultado!=null){
                resultado = await resultado.update({ estado: false });
            } 
            resultado = await productoModel.obtenerProducto(id);  
            console.log(resultado);    
        } catch (exception) {
            console.error('Error en eliminarProducto Model:', exception);
            resultado = null;
        }
        return resultado;
    },

    // Ejemplo de listado usando el objeto ORM
    listarProductos: async() => {
        try {
            const resultados = await producto.findAll({  // 👈 Agrega await aquí
                attributes: ['id', 'nombre', 'precio', 'estado', 'descripcion'],
            });
            console.log("Productos obtenidos:", resultados);
            return resultados;
        } catch (exception) {
            console.error('Error en listarProductos Model:', exception);
            return null;
        }
    },
    // Ejemplo de listado usando una consulta SQL personalizada
    listarProductosActivos: async() => {
        try {
            const consulta = "SELECT id, nombre, precio, estado, descripcion FROM producto WHERE estado = :estado";
            const resultados = await conexion.query(consulta, {
                replacements: { estado: true }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            // Convertir valores numéricos a booleanos
            const resultadosConBooleanos = resultados.map((producto) => ({
                ...producto,
                estado: producto.estado === 1, // Convertir 1 a true, y 0 a false
            }));
            console.log(resultadosConBooleanos);
            return resultadosConBooleanos;
        } catch (exception) {
            console.error('Error en listarProductosActivos Model:', exception);
            return null;
        }
    },
    // Ejemplo de listado usando una consulta SQL personalizada
    listarProductosDesactivos: async() => {
        try {
            const consulta = "SELECT id, nombre, precio, estado, descripcion FROM producto WHERE estado = :estado";
            const resultados = await conexion.query(consulta, {
                replacements: { estado: false }, // Reemplazo de parámetros
                type: dataType.QueryTypes.SELECT,
            });
            // Convertir valores numéricos a booleanos
            const resultadosConBooleanos = resultados.map((producto) => ({
                ...producto,
                estado: producto.estado === 1, // Convertir 1 a true, y 0 a false
            }));
            console.log(resultadosConBooleanos);
            return resultadosConBooleanos;
        } catch (exception) {
            console.error('Error en listarProductosDesactivos Model:', exception);
            return null;
        }
    },
    // Ejemplo usando el ORM  en una consulta personalizada dentro de su metodo
    obtenerProducto: async(id) => {
        let resultado;
        try {
            [resultado] = await  producto.findAll({
                attributes: ['id', 'nombre', 'precio', 'estado', 'descripcion'], // Selecciona los campos que deseas obtener
                where: {
                    id: id, // Filtra por el estado deseado
                },
            });
            console.log(resultado);
        } catch (exception) {
            console.error('Error en obtenerProducto Model:', exception);
            resultado = null;
        }
        return resultado;
    }

}

module.exports = productoModel;