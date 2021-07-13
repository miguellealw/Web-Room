import { useCallback, useMemo } from "react";
import useSWR, { mutate } from "swr";
import { CategoryApi, CategoryResponse } from "../pages/api/categories";
import { confirm } from "../components/DeleteConfirmationDialog";
import useCategoriesStore from "../stores/useCategoriesStore";
import shallow from "zustand/shallow";

export interface useCategoriesType {
  // handleDeleteCategory: (id: number, name: string) => void;
  updateCategory: (id: number, newName: string) => Promise<void>;
  deleteCategory: (id: number, name: string) => Promise<void>;
  createCategory: (name: string) => Promise<void>;
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
      await createCategory(api, name);
    },
    [api, createCategory]
  );

  // UPDATE
  const memoUpdateCategory = useCallback(
    async (id: number, newName: string) => {
      await updateCategory(api, id, newName);
    },
    [api, updateCategory]
  );

  // DELETE
  const memoDeleteCategory = useCallback(
    async (id: number, name: string) => {
      try {
        // If confirm is cancelled it will throw exception
        await confirm(`Are you sure you want to delete ${name}?`);
        await deleteCategory(api, id);
      } catch {}
    },
    [api, deleteCategory]
  );

  return {
    updateCategory: memoUpdateCategory,
    deleteCategory: memoDeleteCategory,
    createCategory: memoCreateCategory,
  };
};

export default useCategories;
