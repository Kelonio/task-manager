import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { environment } from './../../environments/environment';

const API_URL = environment.apiUrl + '/api/';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<any> {
    return this.http.get(API_URL + 'todos');
  }

  saveTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(API_URL + 'todo/save', todo);
  }

  // esto con un get y el id valdría
  deleteTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(API_URL + 'todo/delete', todo);
  }

}
