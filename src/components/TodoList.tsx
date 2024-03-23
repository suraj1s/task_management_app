// "use server"

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/app/_trpc/server";
import CreateTask from "./CreateTask";
import TodoItem from "./TodoItem";

const TodoList = async () => {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const todoData = await api.task.getAllTodos();
    console.log(todoData);
    return (
      <div className="w-full max-w-xs">

        {todoData ? (
          todoData.map((task) => (
           <TodoItem task={task} key={task.id} />
          ))
        ) : (
          <p>You have no tasks yet.</p>
        )}
  
        <CreateTask />
      </div>
    );
  }
  

export default TodoList