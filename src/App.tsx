import { useState } from 'react';
import './App.css';
import ReactIcon from './assets/icons/ReactIcon';
import TsIcon from './assets/icons/TsIcon';
import { TaskList } from './components/TaskList';
import { useTheme } from './ThemeContext/ThemeContext';
import { useTasks } from './hooks/UseTasks';

function App() {
    const { theme, toggleTheme } = useTheme();
    const { taskList, addTask, deleteTask } = useTasks();

    const [newTask, setNewTask] = useState<string>('');

    const handleAddTask = () => {
        if (newTask.trim() === '') return;
        addTask(newTask);
        setNewTask('');
    };

    return (
        <main className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col items-center justify-center p-4`}>
        <button
            onClick={toggleTheme}
            className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 absolute top-4 right-4 sm:top-6 sm:right-6"
        >
            Toggle Theme
        </button>
        <div className='title text-center pb-6'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>Todo App</h1>
            <div className="icons flex justify-center gap-2 mt-2">
                <TsIcon width='40' height='40' />
                <ReactIcon width='40' height='40'/>
            </div>
        </div>
        <input
            className='w-full max-w-md px-4 py-2 text-gray-900 border border-gray-300 rounded-md mb-4'
            type="text"
            value={newTask}
            placeholder='New Task'
            onChange={(e) => setNewTask(e.target.value)}
        />
        <button
            className='py-2 px-4 bg-blue-500 text-white rounded-lg font-medium mb-4 hover:bg-blue-600 transition-colors duration-300'
            onClick={handleAddTask}
        >
            Add Task
        </button>
        <TaskList tasklist={taskList} deleteTask={deleteTask} />
    </main>
    );
}

export default App;
