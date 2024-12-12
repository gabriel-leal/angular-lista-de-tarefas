import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenData } from '../../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl =  environment.apiBase;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.http.get<TokenData>(`${this.apiUrl}/user/list`);
  }

  public newUser(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, dados)
  }

  public deleteUser(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/user/${id}`)
  }
}
