import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductoCrud.css";

function ProductoCrud() {
  const [productos, setProductos] = useState<{ id: number; nombre: string; precio: number; descripcion: string; estado: boolean }[]>([]);
  const [form, setForm] = useState({ nombre: "", precio: "", descripcion: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showEliminados, setShowEliminados] = useState(false);
  const [errors, setErrors] = useState<{ nombre?: string; precio?: string; descripcion?: string }>({});

  // Usa la URL base de la API desde las variables de entorno
  const API_URL = 'http://192.168.100.7:4000/api'; // La IP del servidor en tu red local


  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get<{ id: number; nombre: string; precio: number; descripcion: string; estado: boolean }[]>(
        `${API_URL}/producto`
      );
      const productosActivos = response.data.filter(producto => producto.estado === true);
      setProductos(productosActivos);
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  };

  const handleFilterEliminados = async () => {
    const newShowEliminados = !showEliminados;
    setShowEliminados(newShowEliminados);

    if (newShowEliminados) {
      const url = `${API_URL}/producto/desactivos`;
      try {
        const response = await axios.get<{ id: number; nombre: string; precio: number; descripcion: string; estado: boolean }[]>(url);
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos eliminados", error);
      }
    } else {
      fetchProductos();
    }
  };

  const validateForm = () => {
    const newErrors: { nombre?: string; precio?: string; descripcion?: string } = {};
    if (!form.nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!form.precio) newErrors.precio = "El precio es obligatorio";
    if (!form.descripcion) newErrors.descripcion = "La descripción es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = { ...form, precio: parseFloat(form.precio), estado: true };
      if (editingId) {
        await axios.put(`${API_URL}/producto/${editingId}`, formData);
      } else {
        await axios.post(`${API_URL}/producto`, formData);
      }

      setForm({ nombre: "", precio: "", descripcion: "" });
      setEditingId(null);
      fetchProductos();
    } catch (error) {
      console.error("Error al guardar el producto", error);
    }
  };

  const handleEdit = (producto: { id: number; nombre: string; precio: number; descripcion: string; estado: boolean }) => {
    setForm({ nombre: producto.nombre, precio: producto.precio.toString(), descripcion: producto.descripcion });
    setEditingId(producto.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/producto/${id}`);
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  };

  return (
    <div className="producto-container">
      <h2 className="titulo">Gestión de Productos</h2>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className={`form-input ${errors.nombre ? "error" : ""}`} />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input type="number" placeholder="Precio" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} className={`form-input ${errors.precio ? "error" : ""}`} />
          {errors.precio && <span className="error-message">{errors.precio}</span>}
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea placeholder="Descripción" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className={`form-input ${errors.descripcion ? "error" : ""}`}></textarea>
          {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}
        </div>
        <button type="submit" className="btn-submit">{editingId ? "Actualizar" : "Crear"}</button>
      </form>

      <div className="show-eliminados-container">
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
              <td>{producto.estado ? "Activo" : "Eliminado"}</td>
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
