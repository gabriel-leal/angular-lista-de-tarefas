import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/profiles/users.service';


@Component({
  selector: 'app-new-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-profile.component.html',
  styleUrl: './new-profile.component.scss'
})
export class NewProfileComponent {

  public form!: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UsersService){
    this.form = formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  public submit(){
    const dados = {username: this.form.value.firstName + ' ' + this.form.value.lastName, email: this.form.value.email, firstName: this.form.value.firstName, lastName: this.form.value.lastName, password: this.form.value.password}
    this.userService.newUser(dados).subscribe({
      next: (next) => {
        this.router.navigate(['/profiles'])
      },
      error: (err) => {
        console.log(err)
      }
    })

  }
}
