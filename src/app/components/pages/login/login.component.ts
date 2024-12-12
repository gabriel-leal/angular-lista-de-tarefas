import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../../interfaces/decoded-token';
import { LOCAL_STORAGE_KEYS } from '../../../app.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;

  @ViewChild('credFail') credFail!: ElementRef;

  
  constructor(private router: Router, private formBuilder: FormBuilder, private service: LoginService){ }

  ngOnInit(): void {
    let token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN)
    if(token){
      this.router.navigate(['/home'])
    }else {
      localStorage.clear()
      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]] 
      });
    }
  }

  public submit(){
    const dados = { email: this.form.value.email, password: this.form.value.password };
    this.service.enviarDados(dados).subscribe(res => {
      const token = res.access_token
      localStorage.clear()
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token)
      const decoded = jwtDecode<DecodedToken>(token)
      localStorage.setItem(LOCAL_STORAGE_KEYS.NAME, decoded.name)
      localStorage.setItem(LOCAL_STORAGE_KEYS.EMAIL, decoded.email)
      localStorage.setItem(LOCAL_STORAGE_KEYS.ID, decoded.sub)
      this.router.navigate(['/home'])

    }, error => {
      console.error('Erro ao enviar dados:', error);
      this.credFail.nativeElement.style.display = 'block'
    });
  }
}
