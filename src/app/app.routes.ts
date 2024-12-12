import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProfilesComponent } from './components/pages/profiles/profiles.component';
import { NewTaskComponent } from './components/newTask/new-task/new-task.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { NewProfileComponent } from './components/pages/new-profile/new-profile.component';
import { EditTaskComponent } from './components/pages/edit-task/edit-task.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, title: 'Login / GALEME'},
    {path: 'home', component: HomeComponent, title: 'Home / GALEME'},
    {path: 'profiles', component: ProfilesComponent, title: 'Usuários / GALEME'},
    {path: 'home/novaTarefa', component: NewTaskComponent, title: 'Nova Tarefa / GALEME'},
    {path: 'home/editarTarefa', component: EditTaskComponent, title: 'Editar Tarefa / GALEME'},
    {path: 'profiles/newProfile', component: NewProfileComponent, title: 'Novo Usuario / GALEME'},
    {path: '**', component: NotFoundComponent}
];
