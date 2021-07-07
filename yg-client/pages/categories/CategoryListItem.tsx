import {
  DotsVerticalIcon,
  FolderRemoveIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import React, { useState } from "react";
import Dropdown from "../../components/Dropdown";
import { Category } from "../api/types";

type CategoryDropdownProps = {
  isDropdownOpen: boolean;
  categoryId: number;
  categoryName: string;
  setIsEditing: (value: boolean) => void;
  setIsDropdownOpen: (value: boolean) => void;
  handleDeleteCategory: (id: number, name: string) => void;
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  isDropdownOpen,
  setIsDropdownOpen,
  handleDeleteCategory,
  categoryId,
  categoryName,
}) => {
  return (
    <>
      <Dropdown isOpen={isDropdownOpen}>
        <Dropdown.Item>
          <Link href={`/categories/edit/${categoryId}`} passHref>
            <a className="flex items-center w-full h-full">
              <PencilAltIcon className="w-4 h-4 mr-1" />
              Rename
            </a>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item
          handleClick={(e) => {
            e.preventDefault();
            handleDeleteCategory(categoryId, categoryName);
            setIsDropdownOpen(false);
          }}
        >
          <span className="flex items-center">
            <FolderRemoveIcon className="w-4 h-4 mr-1" />
            Delete
          </span>
        </Dropdown.Item>
      </Dropdown>
    </>
  );
};

type CategoryListItemProps = {
  category: Category;
  handleDeleteCategory: (id: number, name: string) => void;
  handleUpdateCategory: (id: number, value: string) => void;
};

const CategoryListItem: React.FC<CategoryListItemProps> = ({
  category,
  handleDeleteCategory,
  handleUpdateCategory,
}) => {
  const [value, setValue] = useState<string>(category.name);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Link href={`/categories/${category.id}`} passHref>
      <a>
        <li className="bg-white shadow-sm hover:shadow-md transition text-lg font-bold h-28 rounded-md flex justify-center items-center relative cursor-pointer">
          {!isEditing && (
            <DotsVerticalIcon
              className="w-5 h-5 absolute text-gray-400 top-0 right-0 m-2 cursor-pointer hover:bg-gray-200 hover:text-black rounded-full"
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
              categoryName={category.name}
            />
          )}

          {!isEditing ? (
            <span className="w-40 truncate text-center">{category.name}</span>
          ) : (
            // TODO: make editing page like create
            <div>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="rounded-md"
                style={{
                  textIndent: ".5rem",
                }}
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
