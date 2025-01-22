import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductoCrud.css";

function ProductoCrud() {
  const [productos, setProductos] = useState<{ id: number; nombre: string; precio: number; descripcion: string; estado: string }[]>([]);
  const [form, setForm] = useState({ nombre: "", precio: "", descripcion: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showEliminados, setShowEliminados] = useState(false);
  const [errors, setErrors] = useState<{ nombre?: string; precio?: string; descripcion?: string }>({});

  // Obtener productos al cargar el componente
  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get<{ id: number; nombre: string; precio: number; estado: string; descripcion: string }[]>("http://localhost:4000/api/producto");
      setProductos(response.data); // Se ajusta la respuesta de la API al estado de productos
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  };

  // Filtrar productos eliminados
  const handleFilterEliminados = async () => {
    setShowEliminados(!showEliminados);

    const url = showEliminados
      ? "http://localhost:4000/api/producto"
      : "http://localhost:4000/api/producto/desactivos";

    try {
      const response = await axios.get<{ id: number; nombre: string; precio: number; estado: string; descripcion: string }[]>(url);
      setProductos(response.data); // Se ajusta la respuesta de la API al estado de productos
    } catch (error) {
      console.error("Error al obtener productos filtrados", error);
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors: { nombre?: string; precio?: string; descripcion?: string } = {};
    if (!form.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!form.precio || isNaN(parseFloat(form.precio)) || parseFloat(form.precio) <= 0) newErrors.precio = "El precio debe ser un número positivo.";
    if (!form.descripcion) newErrors.descripcion = "La descripción es obligatoria.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar el envío del formulario (crear/actualizar)
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const formData = {
        ...form,
        precio: parseFloat(form.precio), // Asegúrate de convertir a número
      };

      if (editingId) {
        await axios.put(`http://localhost:4000/api/producto/${editingId}`, formData); // Actualiza un producto
      } else {
        await axios.post("http://localhost:4000/api/producto", formData); // Crea un nuevo producto
      }

      // Limpiar formulario y recargar productos
      setForm({ nombre: "", precio: "", descripcion: "" });
      setEditingId(null);
      fetchProductos(); // Vuelve a obtener los productos
    } catch (error) {
      console.error("Error al guardar el producto", error);
    }
  };

  // Manejar edición de un producto
  const handleEdit = (producto: { id: number; nombre: string; precio: number; descripcion: string; estado: string }) => {
    setForm({ nombre: producto.nombre, precio: producto.precio.toString(), descripcion: producto.descripcion });
    setEditingId(producto.id);
  };

  // Manejar eliminación de un producto
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/producto/${id}`); // Elimina un producto
      fetchProductos(); // Recarga la lista de productos
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  return (
    <div className="container">
      <h2>Gestión de Productos</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className={`form-input ${errors.nombre ? "error" : ""}`}
          />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            placeholder="Precio"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
            className={`form-input ${errors.precio ? "error" : ""}`}
          />
          {errors.precio && <span className="error-message">{errors.precio}</span>}
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className={`form-input ${errors.descripcion ? "error" : ""}`}
          ></textarea>
          {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}
        </div>

        <button type="submit" className="btn-submit">
          {editingId ? "Actualizar" : "Crear"}
        </button>
      </form>

      <div>
        <label>Mostrar eliminados</label>
        <input type="checkbox" checked={showEliminados} onChange={handleFilterEliminados} />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.estado}</td> {/* Muestra el estado del producto */}
              <td>
                <button onClick={() => handleEdit(producto)} className="btn-edit">Editar</button>
                <button onClick={() => handleDelete(producto.id)} className="btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductoCrud;
