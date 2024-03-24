// "use server"

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/app/_trpc/server";
import CreateTask from "./CreateTask";
import TaskItem from "./TaskItem";

const TaskList = async ({ category }: { category: string }) => {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const taskData = await api.task.getAllTasks(category);
  return (
    <div className="w-full ">
      <h2 className="py-5 text-2xl font-semibold ">All your task</h2>

      <div className="w-full space-y-8 rounded-3xl border-2 border-slate-200 px-10 py-6 ">
        <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {taskData ? (
            taskData.map((task) => <TaskItem task={task} key={task.id} />)
          ) : (
            <p>You have no tasks yet.</p>
          )}
        </div>
        <CreateTask category={category} />
      </div>
    </div>
  );
};

export default TaskList;
