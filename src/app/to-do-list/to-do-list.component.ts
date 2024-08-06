import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ToDoItem {
  id: number;
  title: string;
  completed: boolean;
}

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
          (keyup.enter)="addToDo()"
        />
        <label for="todoInput">Add a new to-do item</label>
      </div>
      <button class="sort-button" (click)="sortToDos()">Sort</button>
    </header>

    <main class="container">
      <ul>
        <li *ngFor="let todo of toDoList" class="todo-item">
          <input [id]="todo.id" type="checkbox" [(ngModel)]="todo.completed" />

          <label [for]="todo.id" [class.completed]="todo.completed">
            {{ todo.title }}
          </label>

          <button class="delete-button" (click)="deleteToDo(todo.id)">
            Delete
          </button>
        </li>
      </ul>
    </main>
  `,
})
export class ToDoListComponent implements OnChanges {
  newToDo: string = '';
  nextId: number = 0;

  @Input() title: string = '';
  @Input() toDoList: ToDoItem[] = [];

  ngOnChanges(): void {
    this.updateNextId();
  }

  updateNextId(): void {
    const maxId = this.toDoList.reduce(
      (max, todo) => Math.max(max, todo.id),
      -1
    );
    this.nextId = maxId + 1;
  }

  addToDo(): void {
    if (!this.newToDo.trim()) return;

    this.toDoList.push({
      id: this.nextId++,
      title: this.newToDo,
      completed: false,
    });

    this.newToDo = '';
  }

  sortToDos(): void {}

  deleteToDo(id: number): void {}
}
