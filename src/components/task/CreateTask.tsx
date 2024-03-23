"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/app/_trpc/react";

const CreateTask = ({ category }: { category: string }) => {
  const router = useRouter();
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
        createTask.mutate({ title: name, category });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createTask.isPending}
      >
        {createTask.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CreateTask;
