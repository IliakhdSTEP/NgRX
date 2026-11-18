
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task, TaskData } from '../../models/task.model';
import * as TasksActions from '../../store/tasks/tasks.actions';
import {
  selectFilteredTasks,
  selectLoading,
  selectError,
  selectStatusFilter,
  selectSearchQuery,
  selectUserFilter
} from '../../store/tasks/tasks.selectors';

@Component({
  selector: 'app-task-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-management.html',
  styleUrl: './task-management.scss'
})
export class TaskManagement implements OnInit {
  private store = inject(Store);

  tasks$ = this.store.select(selectFilteredTasks);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  statusFilter$ = this.store.select(selectStatusFilter);
  searchQuery$ = this.store.select(selectSearchQuery);
  userFilter$ = this.store.select(selectUserFilter);

  newTask: TaskData = {
    user_id: 0,
    title: '',
    due_on: null,
    status: 'pending'
  };

  editingId: number | null = null;

  ngOnInit() {
    this.store.dispatch(TasksActions.loadTasks());
  }

  addTask() {
    if (!this.newTask.title.trim() || !this.newTask.user_id) {
      return;
    }

    this.store.dispatch(
      TasksActions.addTask({ task: { ...this.newTask } })
    );

    this.resetForm();
  }

  editTask(task: Task) {
    this.editingId = task.id;
    this.newTask = {
      user_id: task.user_id,
      title: task.title,
      due_on: task.due_on,
      status: task.status
    };
  }

  saveTask() {
    if (this.editingId === null) {
      return;
    }

    this.store.dispatch(
      TasksActions.updateTask({
        id: this.editingId,
        task: { ...this.newTask }
      })
    );

    this.resetForm();
  }

  deleteTask(id: number) {
    this.store.dispatch(TasksActions.deleteTask({ id }));
  }

  setStatusFilter(status: string) {
    this.store.dispatch(TasksActions.setStatusFilter({ status }));
  }

  setSearchQuery(query: string) {
    this.store.dispatch(TasksActions.setSearchQuery({ query }));
  }

  setUserFilter(value: string) {
    const userId = value ? Number(value) : null;
    this.store.dispatch(TasksActions.setUserFilter({ userId }));
  }

  resetForm() {
    this.editingId = null;
    this.newTask = {
      user_id: 0,
      title: '',
      due_on: null,
      status: 'pending'
    };
  }
}
