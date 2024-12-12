import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewTaskService {

  private apiUrl = environment.apiBase

  constructor(private http: HttpClient) { }

  public enviaReq(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tarefa`, dados)
  }

}
