"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/app/_trpc/react";
import AddButton from "../common/AddButton";

const CreateTask = ({ category }: { category: string }) => {
  const router = useRouter();
  const decodedCategory = decodeURIComponent(category);
  const [name, setName] = useState("");
  const createTask = api.task.createTask.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTask.mutate({ title: name, category: decodedCategory });
      }}
      className="flex  gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <AddButton isPending={createTask.isPending} title="Create Task" />
    </form>
  );
};

export default CreateTask;
