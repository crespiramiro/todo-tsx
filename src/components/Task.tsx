import TrashIcon from "../assets/icons/TrashIcon";
import { useTheme } from "../ThemeContext/ThemeContext";

type Props = {
    task: string,
    deleteTask: () => void
}

export const Task = ({ task, deleteTask }: Props) => {
    const { theme } = useTheme();

    return ( 
        <div className={`task flex flex-row justify-between rounded-lg items-center px-8 py-6 w-2/6 
            transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-300/50 text-gray-800'}`}>
          <span className="font-medium">{task}</span>  
          <button aria-label="delete task" className="hover:scale-110 transition-all duration-100" onClick={deleteTask}>
                <TrashIcon height="30" width="30" />
          </button>
        </div>
    );
}