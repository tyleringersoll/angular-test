import { Component, Input, OnChanges } from '@angular/core';
import { TodoItem } from '../models/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [
    `
      // CSS can be in SCSS syntax here (if desired)
      //
      // .example-class {
      //   color: red;

      //   &:hover {
      //     text-decoration: underline;
      //   }
      // }
    `,
  ],
  template: `
    <header class="container">
      <h1>{{ title }}</h1>

      <div class="styled-input">
        <input
          [(ngModel)]="newToDo"
          id="todoInput"
          placeholder=" "
          (keyup.enter)="addTodo()"
        />
        <label for="todoInput">Add a new to-do item</label>
      </div>
      <button class="sort-button" (click)="sortToDos()">Sort</button>
    </header>

    <main class="container">
      <ul>
        <li *ngFor="let todo of todos">
          <input [id]="todo.id" type="checkbox" [(ngModel)]="todo.completed" />
          <label [for]="todo.id" [class.completed]="todo.completed">{{
            todo.title
          }}</label>
          <button class="delete-button" (click)="deleteToDo(todo.id)">
            Delete
          </button>
        </li>
      </ul>
    </main>
  `,
})
export class ToDoListComponent implements OnChanges {
  @Input()
  title: string = '';

  @Input()
  todos: TodoItem[] = [];

  newToDo: string = '';
  nextId: number = 0;

  ngOnChanges(): void {
    this.updateNextId();
  }

  updateNextId(): void {
    const maxId = this.todos.reduce((max, todo) => Math.max(max, todo.id), -1);
    this.nextId = maxId + 1;
  }

  addTodo(): void {
    if (!this.newToDo.trim()) return;

    this.todos.push({
      id: this.nextId++,
      title: this.newToDo,
      completed: false,
    });

    this.newToDo = '';
  }

  sortToDos(): void {}

  deleteToDo(id: number): void {}
}
