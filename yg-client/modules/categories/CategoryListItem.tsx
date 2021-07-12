import {
  DotsVerticalIcon,
  FolderRemoveIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import React, { useState } from "react";
import Dropdown from "../../components/Dropdown";
import { Category } from "./";
import useOuterClick from "../../shared-hooks/useOnOuterClick";

type CategoryListItemProps = {
  category: Category;
  handleDeleteCategory: (id: number, name: string) => void;
};

const CategoryListItem: React.FC<CategoryListItemProps> = ({
  category,
  handleDeleteCategory,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const innerRef = useOuterClick(() => setIsDropdownOpen(false))

  return (
    <Link href={`/categories/${category.id}`} passHref>
      <a ref={innerRef}>
        <li className="bg-white shadow-sm hover:shadow-md transition text-lg font-bold h-28 rounded-md flex justify-center items-center relative cursor-pointer">
          <DotsVerticalIcon
            className="w-5 h-5 absolute text-gray-400 top-0 right-0 m-2 cursor-pointer hover:bg-gray-200 hover:text-black rounded-full"
            onClick={(e) => {
              e.preventDefault();
              setIsDropdownOpen(!isDropdownOpen);
            }}
          />
          <span className="w-40 truncate text-center text-sm lg:text-base p-2">{category.name}</span>

          {/* Dropdown */}
          <Dropdown isOpen={isDropdownOpen}>
            <Dropdown.Item>
              <Link href={`/categories/edit/${category.id}`} passHref>
                <a className="flex items-center w-full h-full">
                  <PencilAltIcon className="w-4 h-4 mr-1" />
                  Rename
                </a>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item
              handleClick={(e) => {
                e.preventDefault();
                handleDeleteCategory(category.id, category.name);
                setIsDropdownOpen(false);
              }}
            >
              <span className="flex items-center">
                <FolderRemoveIcon className="w-4 h-4 mr-1" />
                Delete
              </span>
            </Dropdown.Item>
          </Dropdown>
        </li>
      </a>
    </Link>
  );
};

export default CategoryListItem;
