import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { UsersService } from '../../../services/profiles/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss'
})
export class ProfilesComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usersService: UsersService){}

  ngOnInit(): void {
      this.users()
  }
  public users(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.usuarios = users.content
      },
      error: (error) => {
        console.error('Erro ao buscar usuários:', error); 
      }
    });
  }

  public deleteUser(index: number){
    const user = this.usuarios[index];
    this.usersService.deleteUser(user.id).subscribe({
      next: (res) => {
        this.usuarios.splice(index, 1);
      }, 
      error: (err) => {
        console.log(err)
      }
    })
  }
}
