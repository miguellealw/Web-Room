import AuthedLayout from "../layouts/authed_layout";
import React, { ReactDOM, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useCategories from "../../shared-hooks/useCategories";
import BackToCategoriesLink from "../../components/BackToCategoriesLink";
import useCategory from "../../shared-hooks/useCategory";
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

export const CustomCreateCategoryPage: React.FC = () => {
  const [channelName, setChannelName] = useState<string | null>(null);
  const [channelId, setChannelId] = useState<string | null>(null);
  const router = useRouter();
  const { addChannelToCategory } = useCategory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { createCategory } = useCategories();

  useEffect(() => {
    // redirect to categories if page is loaded without channel to add
    if (!localStorage.getItem("channelToAdd")) {
      router.replace("/categories");
    } else {
      const { channelName, channelId } = JSON.parse(
        localStorage.getItem("channelToAdd") as string
      );

      setChannelName(channelName);
      setChannelId(channelId);
    }
  }, [router, channelId, channelName]);

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      const newCategory = await createCategory(data.categoryName);
      console.log("new category", newCategory);

      await addChannelToCategory(
        channelName as string,
        channelId as string,
        newCategory.id
      );

      router.replace(`/categories/${newCategory.id}`);

      localStorage.removeItem("channelToAdd");
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

        {!channelName && !channelId ? (
          <div>No Channel Found. Redirecting...</div>
        ) : (
          <>
            <h1 className="lg:pb-7 text-2xl lg:text-3xl font-bold">
              New Category for{" "}
              <span className="text-red-500">{channelName}</span>
            </h1>

            <form
              className="flex flex-col mt-10"
              // onSubmit={handleCreateCategory}
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
                  Create
                </button>
                <button
                  className="ml-3"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("channelToAdd");
                    router.push("/categories");
                  }}
                >
                  {" "}
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </AuthedLayout>
  );
};
