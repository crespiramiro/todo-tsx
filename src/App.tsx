import { useState } from 'react';
import './App.css';
import ReactIcon from './assets/icons/ReactIcon';
import TsIcon from './assets/icons/TsIcon';
import { TaskList } from './components/TaskList';
import { useTheme } from './ThemeContext/ThemeContext';
import { useTasks } from './hooks/UseTasks';

function App() {
    const { theme, toggleTheme } = useTheme();
    const { taskList, addTask, deleteTask } = useTasks();  // Usa el hook personalizado

    const [newTask, setNewTask] = useState<string>('');

    const handleAddTask = () => {
        if (newTask.trim() === '') return;
        addTask(newTask);
        setNewTask('');
    };

    return (
        <main className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col py-32 `}>
            <button
                onClick={toggleTheme}
                className="py-2 w-fit absolute top-14 right-14 px-4 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
                Toggle Theme
            </button>
            <div className='title flex flex-row gap-x-4 justify-center items-center pb-10'>
                <h1 className='text-5xl font-bold'>Todo App</h1>
                <div className="icons flex flex-row gap-x-2">
                    <TsIcon width='50' height='50' />
                    <ReactIcon width='50' height='50'/>
                </div>
            </div>
            <input
                className='flex w-full text-gray-900 rounded-md px-2 max-w-md py-2 self-center'
                type="text"
                value={newTask}
                placeholder='New Task'
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button
                className='py-2 bg-blue-500 flex w-fit text-white rounded-lg self-center my-4 font-medium px-5'
                onClick={handleAddTask}
            >
                Add Task
            </button>
            <TaskList tasklist={taskList} deleteTask={deleteTask} />
        </main>
    );
}

export default App;
