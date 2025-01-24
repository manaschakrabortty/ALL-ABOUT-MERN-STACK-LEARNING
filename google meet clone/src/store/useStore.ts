import { create } from 'zustand';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  date?: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AppState {
  tasks: Task[];
  user: User | null;
  darkMode: boolean;
  addTask: (task: Omit<Task, 'id'>) => void;
  removeTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setUser: (user: User | null) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<AppState>((set) => ({
  tasks: [],
  user: null,
  darkMode: false,
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: Math.random().toString(36).substr(2, 9) }],
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  setUser: (user) => set({ user }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));