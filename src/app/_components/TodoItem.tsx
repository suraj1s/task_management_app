"use client";
import React from "react";
import { api } from "~/trpc/server";

interface ITodoItemProp {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
}
const TodoItem = ({ task }: ITodoItemProp) => {

  // const updateTask = api.task.updateOne.arguments({

  // });

  // const deleteTask = api.task.deleteOne({});

  
  return (
    <div key={task.id} className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={async (e) => {
          e.preventDefault();
          // updateTask.mutate(task.id, e.target.checked);
        }}
      />
      <p>{task.title}</p>
      <button
      // onClick={async () => {
      //   deleteTask(task.id);
      // }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
