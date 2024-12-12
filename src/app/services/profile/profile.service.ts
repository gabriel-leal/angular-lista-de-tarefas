import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = environment.apiBase

  constructor(private http:HttpClient) { }

  public enviaReq(dados: any, id: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/user/${id}`, dados)
  }
}
