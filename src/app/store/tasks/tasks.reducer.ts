
import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import * as TasksActions from './tasks.actions';

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  statusFilter: string;
  searchQuery: string;
  userFilter: number | null;
}

export const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  statusFilter: 'all',
  searchQuery: '',
  userFilter: null
};

export const tasksReducer = createReducer(
  initialState,

  on(TasksActions.loadTasks, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false
  })),

  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(
    TasksActions.addTask,
    TasksActions.updateTask,
    TasksActions.deleteTask,
    state => ({
      ...state,
      loading: true,
      error: null
    })
  ),

  on(TasksActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    loading: false
  })),

  on(TasksActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(item =>
      item.id === task.id ? task : item
    ),
    loading: false
  })),

  on(TasksActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.id !== id),
    loading: false
  })),

  on(
    TasksActions.addTaskFailure,
    TasksActions.updateTaskFailure,
    TasksActions.deleteTaskFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),

  on(TasksActions.setStatusFilter, (state, { status }) => ({
    ...state,
    statusFilter: status
  })),

  on(TasksActions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query
  })),

  on(TasksActions.setUserFilter, (state, { userId }) => ({
    ...state,
    userFilter: userId
  }))
);
