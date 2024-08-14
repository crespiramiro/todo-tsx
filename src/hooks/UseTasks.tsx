import { useState } from 'react';

export const useTasks = () => {
    const [taskList, setTaskList] = useState<string[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const addTask = (task: string) => {
        if (!task.trim()) return;
        setTaskList(oldTasks => {
            const updatedTasks = [...oldTasks, task];
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    const deleteTask = (index: number) => {
        setTaskList(tasks => {
            const updatedTasks = tasks.filter((_, i) => i !== index);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    return { taskList, addTask, deleteTask };
};
