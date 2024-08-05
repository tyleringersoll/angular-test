import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { TodoItem } from './models/models';
import { DesignMockupComponent } from './design-mockup/design-mockup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    ToDoListComponent,
    DesignMockupComponent,
  ],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'my to-do list';
  todos: TodoItem[] = [
    {
      id: 0,
      title: 'create to-do list',
      completed: true,
    },
    {
      id: 1,
      title: 'add a to-do item',
      completed: true,
    },
    {
      id: 2,
      title: 'make requested style changes',
      completed: false,
    },
    {
      id: 3,
      title: 'delete a to-do item',
      completed: false,
    },
  ];
}
