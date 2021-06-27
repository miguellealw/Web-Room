import {
  DotsVerticalIcon,
  FolderRemoveIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import React, { useState } from "react";
import { Category } from "../pages/api/types";

type CategoryDropdownProps = {
  isDropdownOpen: boolean;
  categoryId: number;
  setIsEditing: (value: boolean) => void;
  setIsDropdownOpen: (value: boolean) => void;
  handleDeleteCategory: (id: number) => void;
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  isDropdownOpen,
  setIsEditing,
  setIsDropdownOpen,
  handleDeleteCategory,
  categoryId,
}) => {
  return (
    <>
      {isDropdownOpen && (
        <ul className="bg-gray-100 w-32 absolute text-sm font-normal top-8 right-3 rounded-sm shadow-xl">
          <li
            className="border-b-2 border-gray-100 py-1 hover:bg-gray-300 px-2 cursor-pointer flex"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
              setIsDropdownOpen(false);
            }}
          >
            <PencilAltIcon className="w-5 h-5 mr-2" />
            Rename
          </li>
          <li
            className="border-gray-100 py-1 hover:bg-gray-300 px-2 cursor-pointer flex"
            onClick={(e) => {
              e.preventDefault();
              handleDeleteCategory(categoryId);
              setIsDropdownOpen(false);
            }}
          >
            <FolderRemoveIcon className="w-5 h-5 mr-2" />
            Delete
          </li>
        </ul>
      )}
    </>
  );
};

type CategoryListItemProps = {
  category: Category;
  handleDeleteCategory: (id: number) => void;
  handleUpdateCategory: (id: number, value: string) => void;
};

const CategoryListItem: React.FC<CategoryListItemProps> = ({
  category,
  handleDeleteCategory,
  handleUpdateCategory,
}) => {
  const [value, setValue] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Link href={`/categories/${category.id}`} passHref>
      <a>
        <li className="bg-white shadow-sm hover:shadow-md transition text-lg font-bold h-28 rounded-md flex justify-center items-center relative cursor-pointer">
          {!isEditing && (
            <DotsVerticalIcon
              className="w-5 h-5 absolute text-gray-400 top-0 right-0 m-2 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsDropdownOpen(!isDropdownOpen);
              }}
            />
          )}

          {isDropdownOpen && (
            <CategoryDropdown
              isDropdownOpen={isDropdownOpen}
              setIsEditing={setIsEditing}
              setIsDropdownOpen={setIsDropdownOpen}
              handleDeleteCategory={handleDeleteCategory}
              categoryId={category.id}
            />
          )}

          {!isEditing ? (
            category.name
          ) : (
            // TODO: make editing page like create
            <div>
              <input
                type="text"
                value={value === "" ? category.name : value}
                onChange={(e) => setValue(e.target.value)}
                onClick={(e) => {
                  e.preventDefault();
                }}
              />

              {/* Buttons */}
              <div>
                <button
                  type="submit"
                  className="text-sm bg-gray-900 hover:bg-gray-600 text-white px-2 rounded"
                  // disabled={value === ""}
                  // disabled={true}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing(false);
                    handleUpdateCategory(category.id, value);
                  }}
                >
                  Save
                </button>

                <button
                  className="text-sm bg-red-500 hover:bg-red-400 text-white px-2 ml-2 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </li>
      </a>
    </Link>
  );
};

export default CategoryListItem;
