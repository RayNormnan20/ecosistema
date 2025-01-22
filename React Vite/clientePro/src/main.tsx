import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Router y Routes
import App from './App.tsx';
import Dashboard from './Dashboard'; // Importa el componente Dashboard
import ProductoCrud from './ProductoCrud'; // Importa el componente ProductoCrud

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router> {/* Envolvemos la aplicación en Router */}
      <Routes> {/* Definimos las rutas */}
        <Route path="/" element={<App />} /> {/* Ruta para el Login */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Ruta para el Dashboard */}
        <Route path="/productos" element={<ProductoCrud />} />

      </Routes>
    </Router>
  </StrictMode>,
);
