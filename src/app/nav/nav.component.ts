import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'wh-app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  projectItem: MenuItem[];
  items: MenuItem[];
  userItem: MenuItem[];

  get env() {
    return environment;
  }

  ngOnInit() {
    this.projectItem = [
      { label: 'PROJECTS', icon: 'pi pi-file-o', routerLink: ['/'] },
    ];

    this.items = [
      { label: 'BUILDS', disabled: true, icon: 'pi pi-share-alt' },
      { label: 'SETTINGS', disabled: true, icon: 'pi pi-cog' },
    ];

    this.userItem = [
      { label: 'user.name', disabled: true, icon: 'pi pi-user' },
    ];
  }
}
