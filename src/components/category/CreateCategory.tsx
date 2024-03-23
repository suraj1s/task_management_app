"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/app/_trpc/react";

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
        disabled={createCategory.isPending}
      >
        {createCategory.isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

export default CreateCategory
