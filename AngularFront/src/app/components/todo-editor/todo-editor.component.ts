import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-editor',
  templateUrl: './todo-editor.component.html',
  styleUrls: ['./todo-editor.component.css']
})
export class TodoEditorComponent implements OnChanges {

  todoForm = new FormGroup({ 
    id: new FormControl(),   
    title: new FormControl(''),
    text: new FormControl(''),
    completed: new FormControl(false),
  });

  @Input() todoEdited: Todo ; 
  @Output() changedTodoEvent = new EventEmitter<Todo>();

  constructor() { }  

  ngOnChanges(changes: SimpleChanges) {
    this.todoEdited = changes.todoEdited.currentValue;   // fetch the current value
    console.log('this.todoEdited been edited',this.todoEdited);

    this.todoForm.patchValue({  
      id: this.todoEdited.id,  
      title: this.todoEdited.title,
      text: this.todoEdited.text,
      completed: this.todoEdited.completed,
    });

    this.todoForm.valueChanges.subscribe(val => {
      //console.log('val',val);

      this.todoEdited = val;

      //this.changedTodoEvent.emit(this.todoEdited);

    })

  }

  save(){
    this.changedTodoEvent.emit(this.todoEdited);
  }

  

}
