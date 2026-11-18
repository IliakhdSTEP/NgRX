
export interface Task {
  id: number;
  user_id: number;
  title: string;
  due_on: string | null;
  status: string;
}

export interface TaskData {
  user_id: number;
  title: string;
  due_on: string | null;
  status: string;
}
