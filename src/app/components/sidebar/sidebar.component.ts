import { Component } from '@angular/core';
import { LOCAL_STORAGE_KEYS } from '../../app.config';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  arrayIds: string[] = ["366ab344-50b3-4ffd-96c1-f18d876d9ec2", "d93f3ab5-9204-4384-8261-ab2d5af66cff"]
  idLogado: string | null = localStorage.getItem(LOCAL_STORAGE_KEYS.ID)
  Admin = false

  constructor(){
    if (this.idLogado && this.arrayIds.includes(this.idLogado)) {
      this.Admin = true
  }
  }
}
