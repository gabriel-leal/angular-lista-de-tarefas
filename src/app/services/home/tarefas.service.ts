import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private apiURL = environment.apiBase

  constructor(private http: HttpClient) { }

  public getTasks(): Observable<any> {
    return this.http.get(`${this.apiURL}/tarefa/list`)
  }

  public putTaskCheck(dados: any, id: string): Observable<any> {
    return this.http.put(`${this.apiURL}/tarefa/${id}`, dados)
  }

  public deleteTasks(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/tarefa/${id}`)
  }

  public editTask(dados: any, id: string | null): Observable<any> {
    return this.http.put(`${this.apiURL}/tarefa/${id}`, dados)
  }
}
