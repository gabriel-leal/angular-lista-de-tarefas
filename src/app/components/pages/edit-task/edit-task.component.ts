import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { FooterComponent } from '../../footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TarefasService } from '../../../services/home/tarefas.service';
import { LOCAL_STORAGE_KEYS } from '../../../app.config';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {

  @ViewChild('nome') nome!: ElementRef
  @ViewChild('descricao') descricao!: ElementRef
  @ViewChild('horario') horario!: ElementRef

  task = {
    id: '',
    nome: '',
    descricao: '',
    horario: '',
    concluida: ''
  }

  constructor(private route: ActivatedRoute, private router: Router, private taskService: TarefasService){
    this.route.queryParams.subscribe(params => {
      this.task.id = params['id']
      this.task.nome = params['nome']
      this.task.descricao = params['descricao']
      this.task.horario = params['horario']
      this.task.concluida = params['concluida']

    })
  }

  submit(){
  const id = this.task.id
  const nome = this.nome.nativeElement.value;
  const descricao = this.descricao.nativeElement.value
  const horario = this.horario.nativeElement.value 
  const concluida = Boolean(this.task.concluida === 'true') 
  const dados = { nome: nome, descricao: descricao, horario: horario, concluida: concluida}
  this.taskService.editTask(dados, id).subscribe({
    next: (res) => {
      this.router.navigate(['/home'])
    },
    error: (err) => {
      console.log(err)
    }
  })
 }

}
