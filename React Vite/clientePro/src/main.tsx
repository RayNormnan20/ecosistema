import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Usa HashRouter
import App from './App.tsx';
import Dashboard from './Dashboard';
import ProductoCrud from './ProductoCrud';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router> {/* Envolvemos la aplicación en Router */}
      <Routes> {/* Definimos las rutas */}
        <Route path="/" element={<App />} /> {/* Ruta para el Login */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Ruta para el Dashboard */}
        <Route path="/productos" element={<ProductoCrud />} /> {/* Ruta para el CRUD de productos */}
      </Routes>
    </Router>
  </StrictMode>,
);
