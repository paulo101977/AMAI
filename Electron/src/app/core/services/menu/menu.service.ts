import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public template: any = [
    {
      label: 'Files',
      submenu: [
        {
          label: 'Install on Folder',
          click: () => {
            this.electronService.ipcRenderer.send('install-folder');
          }
        },
        {
          label: 'Install on Map',
          click: () => {
            this.electronService.ipcRenderer.send('install-map');
          }
        },
        { label: 'Compile' },
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
  ]

  constructor(
    private electronService: ElectronService
    ) { }

  public createMenu() {
    if(this.electronService.isElectron) {
      const { Menu } = this.electronService;
      const menu = Menu.buildFromTemplate(this.template)
      Menu.setApplicationMenu(menu)
    }
  }

}
