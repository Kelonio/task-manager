import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Todo} from '../../models/todo.model';
import {NgbModal,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todoList:Todo[] = [];
  public todoSelected: Todo;
  
  private modalReference!: NgbModalRef;
  closeResult = '';

  public faCheck = faCheck;

  @ViewChild('content') modalContent: ElementRef;

  constructor(private modalService: NgbModal, private dataService: DataService) { 
      /* prueba sin autentificar 
      fetch('http://localhost:8000/api/todos')
      .then(response => response.json())
      .then(data => {
        console.log('fetch',data);
        this.todoList = data;
      });
      */

      dataService.getTodos().subscribe(
        (data: any) => {
           console.log('getTodos',data);
           this.todoList = data;
        },
        (err:any) => {
          console.log(err)
        }
      );
  }

  ngOnInit(): void {
  }


  onChangeTodoEdited(todo: Todo){
    console.log('evento que llega',todo);
    //this.todoSelected = todo;
    //cerramos la modal
    

    this.dataService.saveTodo(todo).subscribe(
      (data: any) => {
         console.log('save todo',data);
         todo = data;
      },
      (err:any) => {
        console.log(err)
      }
    );


    this.todoList = this.todoList.filter(t=> t.id!= todo.id);
    this.todoList.push(todo);
    this.todoList.sort((a, b) => (a.id > b.id) ? 1 : -1);
    this.modalReference.close();


  }
   
  async editTodo(todo?:Todo){ 
    this.todoSelected = todo || { id:0,text:''} as Todo;   
    this.modalReference = await this.modalService.open(this.modalContent);
  }


  async open(content: any) {
    this.modalReference = await this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    
  }

  deleteTodo(todo:Todo){
    this.dataService.deleteTodo(todo).subscribe(
      (data: any) => {
         console.log('delete todo',data);
         this.todoList = this.todoList.filter(t=> t.id!= data.id); 
      },
      (err:any) => {
        console.log(err)
      }
    );
  }

  completedTodos(todos:Todo[]){

    return todos.filter(t => t.completed == true).length;

  }

}
