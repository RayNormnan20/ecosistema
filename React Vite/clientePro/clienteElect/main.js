import { app, BrowserWindow } from 'electron';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

// Emular __dirname en ES modules
const __dirname = dirname(fileURLToPath(import.meta.url));

let serverProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Iniciar el servidor local
  const serverPath = path.join(__dirname, '../node_modules/http-server/bin/http-server');
  const wwwPath = path.join(__dirname, '../clienteproApp/www');
  serverProcess = spawn('node', [serverPath, wwwPath, '-p', '8080']);

  // Esperar a que el servidor esté listo antes de cargar la URL
  serverProcess.stdout.on('data', (data) => {
    if (data.toString().includes('Available on')) {
      win.loadURL('http://localhost:8080');
    //   win.webContents.openDevTools();  // Abre DevTools para depurar
    }
  });

  win.on('closed', () => {
    // Detener el servidor cuando se cierre la ventana
    if (serverProcess) serverProcess.kill();
  });
}

app.whenReady().then(createWindow).catch((err) => {
  console.error('Error al crear la ventana:', err);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
