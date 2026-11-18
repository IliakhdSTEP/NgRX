
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, TaskData } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'https://gorest.co.in/public/v2/todos';

  private getHeaders() {
    return new HttpHeaders({
      Authorization: 'ENTER TOKEN HERE',
      'Content-Type': 'application/json'
    });
  }

  getTasks() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: TaskData) {
    return this.http.post<Task>(
      this.apiUrl,
      task,
      { headers: this.getHeaders() }
    );
  }

  updateTask(id: number, task: Partial<TaskData>) {
    return this.http.patch<Task>(
      `${this.apiUrl}/${id}`,
      task,
      { headers: this.getHeaders() }
    );
  }

  deleteTask(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}
