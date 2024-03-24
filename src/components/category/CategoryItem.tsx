"use client";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import React from "react";
// import { api } from "~/app/_trpc/react";

interface ICategoryItemProp {
  category: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    createdById: string;
}
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
    <Link href={`/home/${category.name}`} key={category.id} className="flex items-center gap-2">
      <p>{category.name}</p>
    </Link>
  );
};

export default CategoryItem;
