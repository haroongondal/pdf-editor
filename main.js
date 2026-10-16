import { app, BrowserWindow } from 'electron';

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 1280, height: 900, title: 'PDF Editor' });
  // a missed drop or stray link would navigate away and lose unsaved edits
  win.webContents.on('will-navigate', e => e.preventDefault());
  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  win.loadFile('index.html');
});
app.on('window-all-closed', () => app.quit());
