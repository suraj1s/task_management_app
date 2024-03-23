"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { api } from "~/app/_trpc/react";

interface ITodoItemProp {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
}
const TodoItem = ({ task }: ITodoItemProp) => {
  const router = useRouter();
  const updateTask = api.task.updateOne.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const deleteTask = api.task.deleteOne.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div key={task.id} className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={async (e) => {
          e.preventDefault();
          updateTask.mutate({ id: task.id, completed: e.target.checked });
        }}
      />
      <p>{task.title}</p>
      <button
        onClick={async () => {
          deleteTask.mutate(task.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
