import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl =  environment.apiBase;

  constructor(private http: HttpClient) { }

  public enviarDados(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, dados);
  }
}
