// Path - /categories/edit/<category_id>
import Link from "next/link";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import AuthedLayout from "../layouts/authed_layout";
import { useRouter } from "next/router";
import { useState } from "react";
import useCategories from "../../shared-hooks/useCategories";
import useCategoriesStore from "../../stores/useCategoriesStore";
import useFetchCategories from "../../shared-hooks/useFetchCategories";
import React from "react";
import BackToCategoriesLink from "../../components/BackToCategoriesLink";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CategoryInput from "./CategoryInput";

type Inputs = {
  categoryName: string;
};

const schema = yup.object().shape({
  categoryName: yup.string().required().min(2).max(60).trim(),
});

export const EditCategoryPage: React.FC = () => {
  // const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);

  const router = useRouter();
  const { updateCategory } = useCategories();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  // Get category from store
  const getCategory = useCategoriesStore((state) => state.getCategory);
  const { edit_category_id } = router.query;
  const categoryToEdit = getCategory(parseInt(edit_category_id as string));
  React.useEffect(() => {
    if (categoryToEdit) setValue("categoryName", categoryToEdit?.name);
  }, [categoryToEdit, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    try {
      updateCategory(parseInt(edit_category_id as string), data.categoryName);
      router.push("/categories");
    } catch (err) {
      if (errors.categoryName?.message)
        errors.categoryName.message =
          "Something went wrong creating the category";
    }
  };

  return (
    <AuthedLayout>
      <div className="py-10">
        <BackToCategoriesLink />

        {categoryToEdit ? (
          <>
            <h1 className="lg:pb-7 text-2xl lg:text-5xl font-bold">
              Edit Category
            </h1>

            <form
              className="flex flex-col mt-10"
              onSubmit={handleSubmit(onSubmit)}
            >
              <CategoryInput
                label={"categoryName"}
                register={register}
                required
              />
              {errors.categoryName && (
                <div className="mt-3 bg-red-200 text-red-500 font-bold text-sm p-2 rounded-md">
                  {errors.categoryName?.message}
                </div>
              )}

              <div className="mt-4 text-sm lg:text-base">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-1 rounded-md">
                  Save
                </button>
                <button
                  className="ml-3"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/categories");
                  }}
                >
                  {" "}
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <h1 className="font-bold text-red-400">
            Error: The category you are trying to edit does not exist
          </h1>
        )}
      </div>
    </AuthedLayout>
  );
};
