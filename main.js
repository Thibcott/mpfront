const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let win;

function createWindow() {

  // Exécuter le script PowerShell avant la création de la fenêtre
  exec('powershell.exe -File "C:/ProgramData/PXT/startPXTsalaire.ps1"', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'exécution du script : ${error}`);
      return;
    }
    console.log(`Sortie du script : ${stdout}`);
    console.error(`Erreurs du script : ${stderr}`);

    // ouvrir un l application une fois le script bien termoner 
    mainWindow = new BrowserWindow({
      width: 1400,
      height: 800,
      webPreferences: {
        nodeIntegration: false
      }
    });

    // mainWindow.setMenu(null);
    mainWindow.loadFile('dist/mpfront/index.html');

    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  });

}

// Événement déclenché lorsque Electron a fini de s'initialiser.
// Certains APIs peuvent être utilisées uniquement après cet événement.
app.whenReady().then(createWindow);

// Exécute un script PowerShell lors de la fermeture de l'application
app.on('before-quit', () => {
  exec('powershell.exe -File "C:/ProgramData/PXT/stopPXTsalaire.ps1"', (error, stdout, stderr) => {
    if (error) {
      console.error(`Erreur lors de l'exécution du script de fermeture : ${error}`);
      return;
    }
    console.log(`Sortie du script de fermeture : ${stdout}`);
    console.error(`Erreurs du script de fermeture : ${stderr}`);
  });
});

// Quitte l'application lorsque toutes les fenêtres sont fermées (sauf sur macOS).
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
