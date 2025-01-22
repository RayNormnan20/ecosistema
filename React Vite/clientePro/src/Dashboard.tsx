import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#f4f4f4',
    }}>
      {/* Menú lateral */}
      <nav style={{
        width: '250px',
        backgroundColor: '#333',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Menú</h2>
        
        {/* Gestión de Productos */}
        <button 
          onClick={() => navigate('/productos')} 
          style={buttonStyle}
        >
          📦 Gestión de Productos
        </button>

        {/* Botón para salir */}
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            ...buttonStyle, 
            backgroundColor: '#b200d6', 
            marginTop: 'auto' 
          }}
        >
          🔙 Cerrar Sesión
        </button>
      </nav>

      {/* Contenido principal */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        <h1 style={{ color: '#333' }}>Bienvenido al Dashboard</h1>
        <p>Selecciona una opción del menú para continuar.</p>
      </div>
    </div>
  );
}

// Estilos de los botones
import { CSSProperties } from 'react';

const buttonStyle: CSSProperties = {
  backgroundColor: '#444',
  color: 'white',
  border: 'none',
  padding: '10px',
  textAlign: 'left',
  width: '100%',
  cursor: 'pointer',
  marginBottom: '5px',
};

export default Dashboard;
