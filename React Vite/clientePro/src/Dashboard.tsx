import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Menú lateral */}
      <nav style={styles.sidebar}>
        <h2 style={styles.menuTitle}>Menú</h2>

        {/* Gestión de Productos */}
        <button onClick={() => navigate('/productos')} style={styles.button}>
          📦 Gestión de Productos
        </button>

        {/* Botón para salir */}
        <button 
          onClick={() => navigate('/')} 
          style={{ ...styles.button, backgroundColor: '#b200d6', marginTop: 'auto' }}
        >
          🔙 Cerrar Sesión
        </button>
      </nav>

      {/* Contenido principal */}
      <div style={styles.content}>
        <h1 style={styles.title}>Bienvenido al Dashboard</h1>
        <p style={styles.text}>Selecciona una opción del menú para continuar.</p>
      </div>
    </div>
  );
}

// Estilos en un objeto para mayor organización
import { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f4f4f4',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#333',
    color: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    transition: 'width 0.3s ease-in-out',
  },
  menuTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '20px',
  },
  button: {
    backgroundColor: '#444',
    color: 'white',
    border: 'none',
    padding: '12px',
    textAlign: 'left',
    width: '100%',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    color: '#333',
    fontSize: '24px',
  },
  text: {
    fontSize: '18px',
    color: '#666',
  },
};

// Media Query para pantallas de 412px de ancho (Android)
const mobileStyles = `
  @media (max-width: 412px) {
    nav {
      width: 60px;
      padding: 10px;
    }
    nav h2 {
      display: none;
    }
    button {
      font-size: 14px;
      padding: 8px;
    }
  }
`;

export default Dashboard;

// Agrega estilos dinámicos al head del documento
const styleTag = document.createElement('style');
styleTag.innerHTML = mobileStyles;
document.head.appendChild(styleTag);
