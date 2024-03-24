"use client";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import React from "react";
// import { api } from "~/app/_trpc/react";

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
  // const router = useRouter();
  // const updateCategory = api.category.updateOne.useMutation({
  //   onSuccess: () => {
  //     router.refresh();
  //   },
  // });

  // const deleteCategory = api.category.deleteOne.useMutation({});

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
        <div className="text-white hover:text-blue-400">
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
        </div>
        <div className="text-white hover:text-blue-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="currentColor"
            id="edit"
          >
            <path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"></path>
            <path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"></path>
          </svg>
        </div>
      </div>

    </div>
  );
};

export default CategoryItem;
