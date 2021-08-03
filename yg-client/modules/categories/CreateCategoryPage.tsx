import AuthedLayout from "../layouts/authed_layout";
import Link from "next/link";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import React, { ReactDOM, useState } from "react";
import { useRouter } from "next/router";
import useCategories from "../../shared-hooks/useCategories";
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

export const CreateCategoryPage: React.FC = () => {
  const router = useRouter();
  const { createCategory } = useCategories();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  // console.log(watch("categoryName"))

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    try {
      createCategory(data.categoryName);
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

        <h1 className="lg:pb-7 text-2xl lg:text-5xl font-bold">
          Create Category
        </h1>

        <form className="flex flex-col mt-10" onSubmit={handleSubmit(onSubmit)}>
          <CategoryInput label={"categoryName"} register={register} required />
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
                router.push("/categories");
              }}
            >
              {" "}
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AuthedLayout>
  );
};
