// "use server"

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/app/_trpc/server";
import CategoryItem from "./CategoryItem";
import CreateCategory from "./CreateCategory";

const CategoryList = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const categoryData = await api.category.getAllCategorys();
  return (
    <div className="w-full ">
      <h2 className="py-5 text-2xl font-semibold ">All your category</h2>

      <div className="w-full rounded-3xl border-2 border-slate-200 px-10 py-6 space-y-8 ">
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryData ? (
            categoryData.map((category) => (
              <CategoryItem category={category} key={category.id} />
            ))
          ) : (
            <p>You have no categorys yet.</p>
          )}
        </div>
        <CreateCategory />
      </div>
    </div>
  );
};

export default CategoryList;
