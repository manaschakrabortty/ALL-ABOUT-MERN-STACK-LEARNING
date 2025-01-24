import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { useStore } from '../store/useStore';

const TaskManager = () => {
  const { tasks, addTask, removeTask, toggleTask, darkMode } = useStore();
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask({ title: newTask.trim(), completed: false });
      setNewTask('');
    }
  };

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Tasks
      </h3>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className={`flex-1 px-3 py-2 rounded-md border ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3 rounded-md ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTask(task.id)}
                className={`p-1 rounded-full ${
                  task.completed
                    ? 'bg-green-500 text-white'
                    : darkMode
                    ? 'bg-gray-600 text-gray-400'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                <Check className="h-4 w-4" />
              </button>
              <span
                className={`${task.completed ? 'line-through' : ''} ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {task.title}
              </span>
            </div>
            <button
              onClick={() => removeTask(task.id)}
              className={`p-1 rounded-full hover:bg-red-100 ${
                darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;