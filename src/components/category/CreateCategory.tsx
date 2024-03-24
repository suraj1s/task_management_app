"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/app/_trpc/react";
import AddButton from "../common/AddButton";

const CreateCategory = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  const createCategory = api.category.createCategory.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createCategory.mutate({ name: name });
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
      <AddButton isPending = {createCategory.isPending } title="Create Category" />
    </form>
  );
};

export default CreateCategory;
