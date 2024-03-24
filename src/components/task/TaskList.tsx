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
        <div>
          {taskData.length > 0 ? (
            <div className="grid grid-cols-1 gap-8  sm:grid-cols-2">
              <div>
                <h3> Incomplete Tasks </h3>
                <div className=" border border-slate-300 py-10 px-5 rounded-xl grid grid-cols-1 gap-6 md:grid-cols-2">
                  {taskData
                    .filter((task) => !task.completed)
                    .map((task) => (
                      <TaskItem task={task} key={task.id} />
                    ))}
                </div>
              </div>
              <div>
                <h3> Complete Tasks </h3>
                <div className="border border-slate-300 py-10 px-5  rounded-xl grid grid-cols-1 gap-6 md:grid-cols-2">
                  {taskData
                    .filter((task) => task.completed)
                    .map((task) => (
                      <TaskItem task={task} key={task.id} />
                    ))}
                </div>
              </div>
            </div>
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
