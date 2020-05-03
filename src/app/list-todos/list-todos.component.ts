import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';


//LDCV Create a class for a single todo
export class Todo{
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  // todos = [
  //   new Todo( 1, 'Learn to dance', false, new Date()),
  //   new Todo(2, 'Learn Angular web development', false, new Date()),
  //   new Todo(3, 'Learn French', false, new Date())
  // ]

  todos: Todo[]

  message: string


  // todo = {
  //   id: 1,
  //   description: 'Learn to Dance'
  // }

  constructor( private todoService:TodoDataService,
    private router: Router) { }

  ngOnInit(): void {

    console.log( "todo-data service")
    this.refreshTodos();
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('UserHardCoded').subscribe(
      response=> {
        console.log( response )
        this.todos = response
      }
    );

  }

  deleteTodo( id ){
    console.log(`Delete todo with id ${id}`)
    this.todoService.deleteTodo( 'in28minutes', id).subscribe(
      response => {
        console.log( response )
        this.message = `Delete of Todo ${id} was Successful!`;
        this.refreshTodos();
      }
    )
  }

  updateTodo( id ){
    console.log(`Update todo with id ${id}`)
    this.router.navigate(['todos', id])
  }


}
