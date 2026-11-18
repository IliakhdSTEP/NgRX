
import { createAction, props } from '@ngrx/store';
import { Task, TaskData } from '../../models/task.model';

export const loadTasks = createAction(
  '[Tasks] Load Tasks'
);

export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: string }>()
);

export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: TaskData }>()
);

export const addTaskSuccess = createAction(
  '[Tasks] Add Task Success',
  props<{ task: Task }>()
);

export const addTaskFailure = createAction(
  '[Tasks] Add Task Failure',
  props<{ error: string }>()
);

export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ id: number; task: Partial<TaskData> }>()
);

export const updateTaskSuccess = createAction(
  '[Tasks] Update Task Success',
  props<{ task: Task }>()
);

export const updateTaskFailure = createAction(
  '[Tasks] Update Task Failure',
  props<{ error: string }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ id: number }>()
);

export const deleteTaskSuccess = createAction(
  '[Tasks] Delete Task Success',
  props<{ id: number }>()
);

export const deleteTaskFailure = createAction(
  '[Tasks] Delete Task Failure',
  props<{ error: string }>()
);

export const setStatusFilter = createAction(
  '[Tasks] Set Status Filter',
  props<{ status: string }>()
);

export const setSearchQuery = createAction(
  '[Tasks] Set Search Query',
  props<{ query: string }>()
);

export const setUserFilter = createAction(
  '[Tasks] Set User Filter',
  props<{ userId: number | null }>()
);
