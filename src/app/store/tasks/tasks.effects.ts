
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TaskService } from '../../services/task.service';
import * as TasksActions from './tasks.actions';

@Injectable()
export class TasksEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => TasksActions.loadTasksSuccess({ tasks })),
          catchError(() =>
            of(TasksActions.loadTasksFailure({
              error: 'Failed to load tasks'
            }))
          )
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addTask),
      mergeMap(({ task }) =>
        this.taskService.addTask(task).pipe(
          map(createdTask =>
            TasksActions.addTaskSuccess({ task: createdTask })
          ),
          catchError(() =>
            of(TasksActions.addTaskFailure({
              error: 'Failed to add task'
            }))
          )
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      mergeMap(({ id, task }) =>
        this.taskService.updateTask(id, task).pipe(
          map(updatedTask =>
            TasksActions.updateTaskSuccess({ task: updatedTask })
          ),
          catchError(() =>
            of(TasksActions.updateTaskFailure({
              error: 'Failed to update task'
            }))
          )
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      mergeMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() =>
            TasksActions.deleteTaskSuccess({ id })
          ),
          catchError(() =>
            of(TasksActions.deleteTaskFailure({
              error: 'Failed to delete task'
            }))
          )
        )
      )
    )
  );
}
