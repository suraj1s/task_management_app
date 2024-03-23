// "use server"

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/app/_trpc/server";
import CreateTask from "./CreateTask";
import TaskItem from "./TaskItem";

const TaskList = async ({category} : {category : string}) => {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const taskData = await api.task.getAllTasks(category);
    return (
      <div className="w-full max-w-xs">

        {taskData ? (
          taskData.map((task) => (
           <TaskItem task={task} key={task.id} />
          ))
        ) : (
          <p>You have no tasks yet.</p>
        )}
  
        <CreateTask  category = {category}/>
      </div>
    );
  }
  

export default TaskList