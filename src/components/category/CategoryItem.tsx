"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { api } from "~/app/_trpc/react";

interface ICategoryItemProp {
  category: {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
  };
}
const CategoryItem = ({ category }: ICategoryItemProp) => {
  const router = useRouter();
  // const updateCategory = api.category.updateOne.useMutation({
  //   onSuccess: () => {
  //     router.refresh();
  //   },
  // });

  const deleteCategory = api.category.deleteOne.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="flex flex-row  justify-between cursor-pointer  gap-5 rounded-md  bg-slate-800 px-5 py-3 ">
    <Link
      href={`/home/${category.name}`}
      key={category.id}
      className="flex flex-row  justify-between cursor-pointer  gap-2 rounded-md border border-slate-200 bg-slate-800 px-5 py-3 hover:bg-slate-700  hover:text-blue-300"
    >
      <div className="flex flex-col gap-y-2">
        <h4 className="text-xl font-semibold ">{category?.name}</h4>
        <p>{category?.description}</p>
      </div>
    </Link>
      <div className="flex flex-col gap-y-3 ">
        <button onClick={() => {
          deleteCategory.mutate(category.id);
        }} className="text-white hover:text-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="currentColor"
          >
            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
          </svg>
        </button>
      </div>

    </div>
  );
};

export default CategoryItem;
