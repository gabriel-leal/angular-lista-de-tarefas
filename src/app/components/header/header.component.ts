import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LOCAL_STORAGE_KEYS } from '../../app.config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  constructor(@Inject(DOCUMENT) private document: Document, private authService: AuthService){}

  public logout(){
    this.authService.logout()
  }

  toggle()
  {
    this.document.body.classList.toggle('toggle-sidebar')
  }

  public nome = localStorage.getItem(LOCAL_STORAGE_KEYS.NAME)
}
