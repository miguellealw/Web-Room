import React, { useEffect } from "react";
import AuthedLayout from "../../pages/layouts/authed_layout";
import CategoryListItem from "./CategoryListItem";
import useCategories from "../../shared-hooks/useCategories";
import NewCategoryButton from "./NewCategoryButton";
import useFetchCategories from "../../shared-hooks/useFetchCategories";
import useCategoriesStore from "../../stores/useCategoriesStore";

export const CategoriesPage: React.FC = () => {
  const { error, isLoading } = useFetchCategories();
  const { deleteCategory, updateCategory } = useCategories();
  const categories = useCategoriesStore((state) => state.categories);

  if (error) return <div>Error loading categories page...</div>;

  return (
    <AuthedLayout>
      <div className="py-10">
        {isLoading ? (
          <div>Loading your Categories...</div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-10">
              <h1 className="pb-7 text-2xl lg:text-5xl font-bold">
                Your Categories
              </h1>
              <div className="text-gray-400 text-sm uppercase font-bold">
                {/* {data?.categories?.length} Categories */}
                {categories?.length} Categories
              </div>
            </div>
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* {data?.categories?.map((category, index) => ( */}
              {categories?.map((category, index) => (
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