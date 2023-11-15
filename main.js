const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  // Crée une fenêtre de navigateur.
  win = new BrowserWindow({
    width: 1500,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Charge index.html
  win.loadFile('dist/mpfront/index.html');
}

// Événement déclenché lorsque Electron a fini de s'initialiser.
// Certains APIs peuvent être utilisées uniquement après cet événement.
app.whenReady().then(createWindow);

// Quitte l'application lorsque toutes les fenêtres sont fermées (sauf sur macOS).
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // Sur macOS, recrée une fenêtre dans l'application lorsqu'il n'y a pas de fenêtre ouverte.
  if (win === null) {
    createWindow();
  }
});
