import TrashIcon from "../assets/icons/TrashIcon";
import { useTheme } from "../ThemeContext/ThemeContext";

type Props = {
    task: string,
    deleteTask: () => void
}

export const Task = ({ task, deleteTask }: Props) => {
    const { theme } = useTheme();

    return ( 
        <div className={`task flex flex-row justify-between items-center px-4 py-4 w-full max-w-md
            transition-colors duration-300 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-300/50 text-gray-800'}`}>
          <span className="font-medium truncate">{task}</span>  
          <button aria-label="delete task" className="hover:scale-110 transition-transform duration-100" onClick={deleteTask}>
                <TrashIcon height="24" width="24" />
          </button>
        </div>
    );
}
