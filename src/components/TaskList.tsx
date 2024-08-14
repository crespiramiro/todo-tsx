import { MagicMotion, MagicExit } from "react-magic-motion";
import { Task } from "./Task";

type Props = {
 tasklist: string[],
 deleteTask: (index:number) => void
}

export const TaskList = ({tasklist, deleteTask}: Props) => {
    return ( 
        <MagicMotion>
        <div className="tasklist flex flex-col gap-y-8 py-2  justify-center items-center " >
            <MagicExit exit={{ opacity: 0 }}>
            {tasklist.map((task, index) => (
                <Task key={index} task={task} deleteTask={()=>deleteTask(index)}></Task>
            ) )} 
            </MagicExit>
        </div>
        </MagicMotion>
    );
}
