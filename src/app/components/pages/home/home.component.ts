import { Component, OnInit,  } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { FooterComponent } from '../../footer/footer.component';
import { TarefasService } from '../../../services/home/tarefas.service';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent, NgClass, NgStyle, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  tarefas: any[] = []
  color = 'black'
  class = 'bi bi-check-square'
  tarefaSelecionadaIndex: number | null = null;
  tarefaSelecionada: any = null;

  constructor(private taskService: TarefasService, private router: Router){ }

  ngOnInit(): void {
    this.tasks();
  }
  
  public tasks(): void {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tarefas = res.content.map((tarefa: any) => ({
          ...tarefa,
          color: tarefa.concluida ? 'green' : 'black',
          class: tarefa.concluida ? 'bi bi-check-square-fill' : 'bi bi-check-square',
          concluida: tarefa.concluida ?? false 
        }));
      },
      error: (err) => {
        console.error('Erro ao buscar tarefas', err);
      }
    });
  }
  
  check(index: number): void {
    const tarefa = this.tarefas[index];
    const dados = {"nome": tarefa.nome,"descricao": tarefa.descricao,"horario": tarefa.horario,"concluida": !tarefa.concluida}
    this.taskService.putTaskCheck(dados, tarefa.id).subscribe({
      next: (res) => {
      },
      error: (err) => {
        console.log(err)
      }
    })
    if (tarefa.concluida) {
      tarefa.color = 'black';
      tarefa.class = 'bi bi-check-square';
      tarefa.concluida = false;
    } else {
      tarefa.color = 'green';
      tarefa.class = 'bi bi-check-square-fill';
      tarefa.concluida = true;
    }
  }

  editTask(index: number){
    const tarefa = this.tarefas[index]
    this.router.navigate(['/home/editarTarefa'], {queryParams: tarefa})
  }

  deleteTask(index: number){
    const tarefa = this.tarefas[index]
    return tarefa

  }

  openDeleteModal(index: number): void {
    this.tarefaSelecionadaIndex = index;
    this.tarefaSelecionada = this.tarefas[index];
  }
  
  confirmDeleteTask(): void {
    if (this.tarefaSelecionadaIndex !== null) {
      this.tarefas.splice(this.tarefaSelecionadaIndex, 1); 
      this.taskService.deleteTasks(this.tarefaSelecionada.id).subscribe({
            next: (res) => {
            },
            error: (err) => {
              console.log(err)
            }
          })
    }
    this.tarefaSelecionadaIndex = null;
    this.tarefaSelecionada = null;
  }
}
