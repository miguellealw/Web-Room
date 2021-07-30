import { useCallback, useMemo } from "react";
import useSWR, { mutate } from "swr";
import { CategoryApi, CategoryResponse } from "../pages/api/old_categories";
import { confirm } from "../components/DeleteConfirmationDialog";
import useCategoriesStore from "../stores/useCategoriesStore";
import shallow from "zustand/shallow";

export interface useCategoriesType {
  // handleDeleteCategory: (id: number, name: string) => void;
  updateCategory: (id: number, newName: string) => any;
  deleteCategory: (id: number, name: string) => any;
  createCategory: (name: string) => any;
}

const useCategories: () => useCategoriesType = () => {
  const { createCategory, updateCategory, deleteCategory } = useCategoriesStore(
    (state) => ({
      createCategory: state.createCategory,
      updateCategory: state.updateCategory,
      deleteCategory: state.deleteCategory,
    }),
    shallow
  );

  // useMemo will return the same instance of CategoryApi instead of creating a new one
  let api = useMemo(() => new CategoryApi(), []);
  api.setup();

  // TODO: may not need to wrap in useCallback
  // CREATE
  const memoCreateCategory = useCallback(
    async (name: string) => {
      return await createCategory(name);
      // return res.category;
    },
    [createCategory]
  );

  // UPDATE
  const memoUpdateCategory = useCallback(
    async (id: number, newName: string) => {
      return await updateCategory(id, newName);
    },
    [updateCategory]
  );

  // DELETE
  const memoDeleteCategory = useCallback(
    async (id: number, name: string) => {
      try {
        // If confirm is cancelled it will throw exception
        await confirm(`Are you sure you want to delete ${name}?`);
        return await deleteCategory(id);
      } catch {}
    },
    [deleteCategory]
  );

  return {
    updateCategory: memoUpdateCategory,
    deleteCategory: memoDeleteCategory,
    createCategory: memoCreateCategory,
  };
};

export default useCategories;
