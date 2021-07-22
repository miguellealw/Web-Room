import AuthedLayout from "../layouts/authed_layout";
import Link from "next/link";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import React, { ReactDOM, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useCategories from "../../shared-hooks/useCategories";
import BackToCategoriesLink from "../../components/BackToCategoriesLink";
import useCategory from "../../shared-hooks/useCategory";

export const CustomCreateCategoryPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [channelName, setChannelName] = useState<string | null>(null);
  const [channelId, setChannelId] = useState<string | null>(null);
  const router = useRouter();
  // TODO: figure out how to get category ID here
  const { addChannelToCategory } = useCategory();

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

  const handleCreateCategory = async (e: React.FormEvent) => {
    // TODO: data validtion
    if (!channelId && !channelName)
      console.error("NO CHANNEL ID OR NAME PROVIDED");
    e.preventDefault();
    setIsError(false);

    try {
      // TODO: add channel to category

      const newCategory = await createCategory(value);
      console.log("new category", newCategory);
      await addChannelToCategory(
        channelName as string,
        channelId as string,
        newCategory.id
      );
      router.replace("/channels");

      localStorage.removeItem("channelToAdd");
    } catch (err) {
      setIsError(true);
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
              onSubmit={handleCreateCategory}
            >
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
                  Create
                </button>
                <button
                  className="ml-3"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("channelToAdd");
                    setValue("");
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
