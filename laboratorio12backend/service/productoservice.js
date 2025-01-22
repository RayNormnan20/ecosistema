const productoModel = require("../data/productoModel");

const crearProducto = async(nombre, precio, estado, descripcion) => {
    let producto = null;
    try {
        producto = await productoModel.crearProducto(nombre, precio, estado, descripcion );
    } catch (exception) {
        console.error('Error en crearProducto Service:', exception);
        producto = null;
    }
    return producto;
}

const actualizarProducto = async(id,nombre, precio, estado, descripcion) => {
    let producto = null;
    try {
        producto = await productoModel.actualizarProducto(id,nombre, precio, estado, descripcion);   
    } catch (exception) {
        console.error('Error en actualizarProducto Service:', exception);
        producto = null;
    }
    return producto;
}

const eliminarProducto = async(id) => {
    let producto = null;
    try {
        producto = await productoModel.eliminarProducto(id);       
    } catch (exception) {
        console.error('Error en eliminarProducto Service:', exception);
        producto = null;
    }
    return producto;
}


const listarProductos = async() => {
    let listaProductos;
    try {
        listaProductos = await productoModel.listarProductos();
    } catch (exception) {
        console.error('Error en listarProductos Service:', exception);
        listaProductos = null;
    }
    return listaProductos;
}

const listarProductosActivos = async() => {
    let listaProductos;
    try {
        listaProductos = await productoModel.listarProductosActivos();
    } catch (exception) {
        console.error('Error en listarProductosActivos Service:', exception);
        listaProductos = null;
    }
    return listaProductos;
}

const listarProductosDesactivos = async() => {
    let listaProductos;
    try {
        listaProductos = await productoModel.listarProductosDesactivos();
    } catch (exception) {
        console.error('Error en listarProductosDesactivos Service:', exception);
        listaProductos = null;
    }
    return listaProductos;
}

const obtenerProducto = async(id) => {
    let producto;
    try {
        producto = await productoModel.obtenerProducto(id);
    } catch (exception) {
        console.error('Error en obtenerProducto Service:', exception);
        producto = null;
    }
    return producto;
}


module.exports = {
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    listarProductos,
    listarProductosActivos,
    listarProductosDesactivos,
    obtenerProducto
}