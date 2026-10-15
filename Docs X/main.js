const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    title: "Docs X",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// File Save Handlers
ipcMain.handle('save-file', async (event, { content, defaultName, filters }) => {
  const { filePath } = await dialog.showSaveDialog({
    title: 'Save File',
    defaultPath: defaultName,
    filters: filters
  });

  if (filePath) {
    fs.writeFileSync(filePath, content);
    return { success: true, filePath };
  }
  return { success: false };
});
