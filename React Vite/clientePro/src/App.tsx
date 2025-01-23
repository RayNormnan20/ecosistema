import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook para navegación

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === 'admin' && password === '12345') {
      setMessage('Login exitoso');
      navigate('/Dashboard'); // Redirige a /dashboard si las credenciales son correctas
    } else {
      setMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#6600cc',
      margin: 0,
      padding: '35px',
      boxSizing: 'border-box',
    }}>
      <form onSubmit={handleLogin} style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#fff',
        margin: '0 20px',
      }}>
        <h2 style={{ color: '#1e1e1e' }}>Login</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '10px',
            margin: '10px 0',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: '#f9f9f9',
            color: '#333',
          }}
        />
        <div style={{ position: 'relative', marginBottom: '10px' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '10px',
              margin: '10px 0',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#f9f9f9',
              color: '#333',
              width: '94%',
            }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#333',
            }}
          >
            {showPassword ? '🙈' : '👁'}
          </span>
        </div>
        <button type="submit" style={{
          padding: '10px',
          fontSize: '16px',
          backgroundColor: '#b200d6',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          marginTop: '10px',
        }}>
          Iniciar sesión
        </button>
      </form>
      {message && <p style={{ fontSize: '18px', marginTop: '20px', color: '#fff' }}>{message}</p>}
    </div>
  );
}

export default App;
