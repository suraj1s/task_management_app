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
      <div className="w-full max-w-xs">
      <h2>All your category</h2>

        {categoryData ? (
          categoryData.map((category) => (
           <CategoryItem category={category} key={category.id} />
          ))
        ) : (
          <p>You have no categorys yet.</p>
        )}
  
        <CreateCategory />
      </div>
    );
  }
  

export default CategoryList