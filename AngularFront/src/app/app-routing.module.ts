import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistryComponent } from './pages/registry/registry.component';
import { TodoListComponent} from './pages/todo-list/todo-list.component';
import { AuthGuard} from './services/auth.guard'

const routes: Routes = [
  { path: 'list', component: TodoListComponent, canActivate: [ AuthGuard ]},
  { path: 'login', component: LoginComponent },
  { path: 'registry', component: RegistryComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
