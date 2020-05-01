import { Component, OnInit } from '@angular/core';


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

  todos = [
    new Todo( 1, 'Learn to dance', false, new Date()),
    new Todo(2, 'Learn Angular web development', false, new Date()),
    new Todo(3, 'Learn French', false, new Date())
  ]

  // todo = {
  //   id: 1,
  //   description: 'Learn to Dance'
  // }

  constructor() { }

  ngOnInit(): void {
  }

}
