import React from "react";
import AuthedLayout from "../layouts/authed_layout";
import CategoryListItem from "./CategoryListItem";
import useCategories from "../../shared-hooks/useCategories";
import NewCategoryButton from "./NewCategoryButton";


function Categories() {
  const { data, error, isLoading, deleteCategory, updateCategory } =
    useCategories();

  if (error) return <div>Error loading categories page...</div>;

  return (
    <AuthedLayout>
      <div className="py-10">
        {isLoading ? (
          <div>Loading your Categories...</div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-5xl font-bold">Your Categories</h1>
              <div className="text-gray-500">
                {data?.categories?.length} Categories
              </div>
            </div>
            <ul className="grid grid-cols-3 gap-4">
              {data?.categories?.map((category, index) => (
                <CategoryListItem
                  key={index}
                  category={category}
                  handleDeleteCategory={deleteCategory}
                  handleUpdateCategory={updateCategory}
                />
              ))}

              <NewCategoryButton />
            </ul>
          </>
        )}
      </div>
    </AuthedLayout>
  );
}

export default Categories;
