import { Component, Input, OnChanges } from '@angular/core';
import { TodoItem } from '../models/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finished-to-do-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [
    `
      .sort-button {
        margin-top: 2rem;
        padding: 0.5rem 1rem;
        color: #3f51b5;
        background-color: white;
        border: 2px solid #3f51b5;
        border-radius: 0.5rem;
      }

      .delete-button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        border: none;
        border-radius: 0.25rem;
        background-color: #3f51b5;
        color: white;
        cursor: pointer;
      }

      h1 {
        text-transform: capitalize;
      }

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;

        label {
          flex: 1;
          text-transform: uppercase;
        }

        button {
          margin-left: auto;
        }
      }

      .completed {
        text-decoration: line-through;
      }
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
      <button (click)="sortToDos()">Sort</button>
    </header>

    <main class="container">
      <ul>
        <li *ngFor="let todo of todos">
          <input [id]="todo.id" type="checkbox" [(ngModel)]="todo.completed" />
          <label [for]="todo.id" [class.completed]="todo.completed">{{
            todo.title
          }}</label>
          <button (click)="deleteToDo(todo.id)">Delete</button>
        </li>
      </ul>
    </main>
  `,
})
export class FinishedToDoListComponent implements OnChanges {
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

  sortToDos(): void {
    this.todos.sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
    );
  }

  deleteToDo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
