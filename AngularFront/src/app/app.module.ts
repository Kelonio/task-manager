import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoEditorComponent } from './components/todo-editor/todo-editor.component';
import { LoginComponent } from './pages/login/login.component';
import { authInterceptorProviders } from './interceptor/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistryComponent } from './pages/registry/registry.component';

import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoEditorComponent,
    LoginComponent,
    RegistryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule, //ojo que usamos los dos tipos de form
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [authInterceptorProviders, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
