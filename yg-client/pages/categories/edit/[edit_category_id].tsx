import Link from "next/link";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import AuthedLayout from "../../layouts/authed_layout";
import { useRouter } from "next/router";
import { useState } from "react";
import useCategories from "../../../shared-hooks/useCategories";
// Path - /categories/edit/<category_id>

const EditPage = () => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const { edit_category_id } = router.query;

  const { createCategory } = useCategories();

  // const handleCreateCategory = async (e: React.FormEvent) => {
  //   // TODO: data validtion
  //   e.preventDefault();
  //   setIsError(false);

  //   try {
  //     createCategory(value);
  //     router.replace("/categories");
  //   } catch (err) {
  //     setIsError(true);
  //   }
  // };

  return (
    <AuthedLayout>
      <div className="py-10">
        <Link href="/categories" passHref>
          <div className="text-sm lg:text-lg mb-5 hidden lg:flex items-center lg:mb-10 text-gray-400 hover:text-gray-600 cursor-pointer w-48">
            <ArrowNarrowLeftIcon className="w-6 h-6 mr-2" />
            Back to Categories
          </div>
        </Link>

        <h1 className="lg:pb-7 text-2xl lg:text-5xl font-bold">
          Edit Category
        </h1>

        <form className="flex flex-col mt-10">
          <div>
            <label
              htmlFor="name"
              className="text-base lg:text-lg font-bold block mb-1"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="Cooking Channels"
              className="w-full rounded-md p-1 lg:p-2"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>

          {/* TODO: show api errors */}
          {isError && (
            <div className="mt-2 text-red-500">
              Error occured creating category. Try Again.
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
                setValue("");
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

export default EditPage;
