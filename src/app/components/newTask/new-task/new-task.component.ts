import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewTaskService } from '../../../services/newTask/new-task.service';
import { FooterComponent } from '../../footer/footer.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FooterComponent, SidebarComponent, HeaderComponent],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent implements OnInit {

  @ViewChild('credFail') credFail!: ElementRef;

  public form!: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder, private service: NewTaskService){}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        nome: ['', [Validators.required]],
        descricao: ['', [Validators.required]],
        horario: ['', [Validators.required]]
      })
  }

  public submit(){
    const req = {nome: this.form.value.nome,descricao: this.form.value.descricao,horario: this.form.value.horario,concluida: false}
    this.service.enviaReq(req).subscribe({
      next: async (res) => {
        this.router.navigate(['/home'])

      },
      error: async (err) => {
        console.error(err)
        this.credFail.nativeElement.style.display = 'block'
      }
    })
  }
}
