import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListComponent } from './to-do-list.component';

describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update nextId based on todos input', () => {
    component.todos = [{ id: 1, title: 'Test Todo', completed: false }];
    component.ngOnChanges();
    expect(component.nextId).toBe(2);
  });

  it('should add a new todo', () => {
    component.newToDo = 'New Todo';
    component.addTodo();
    expect(component.todos.length).toBe(1);
    expect(component.todos[0].title).toBe('New Todo');
    expect(component.todos[0].completed).toBe(false);
  });

  it('should not add a new todo if title is empty', () => {
    component.newToDo = ' ';
    component.addTodo();
    expect(component.todos.length).toBe(0);
  });

  it('should increment nextId when a new todo is added', () => {
    component.newToDo = 'Another Todo';
    component.addTodo();
    expect(component.nextId).toBe(1);
  });
});
