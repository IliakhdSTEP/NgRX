
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';

export const selectTasksState =
  createFeatureSelector<TasksState>('tasks');

export const selectAllTasks = createSelector(
  selectTasksState,
  state => state.tasks
);

export const selectLoading = createSelector(
  selectTasksState,
  state => state.loading
);

export const selectError = createSelector(
  selectTasksState,
  state => state.error
);

export const selectStatusFilter = createSelector(
  selectTasksState,
  state => state.statusFilter
);

export const selectSearchQuery = createSelector(
  selectTasksState,
  state => state.searchQuery
);

export const selectUserFilter = createSelector(
  selectTasksState,
  state => state.userFilter
);

export const selectFilteredTasks = createSelector(
  selectAllTasks,
  selectStatusFilter,
  selectSearchQuery,
  selectUserFilter,
  (tasks, status, query, userId) => {
    return tasks.filter(task => {
      const matchesStatus =
        status === 'all' || task.status === status;

      const matchesSearch =
        task.title.toLowerCase().includes(query.toLowerCase());

      const matchesUser =
        userId === null || task.user_id === userId;

      return matchesStatus && matchesSearch && matchesUser;
    });
  }
);
