import React, { useEffect, useState } from "react";
import { ChannelsApi } from "./api/channels";
import { Category, Channel } from "./api/types";
import { useRouter } from 'next/router'
import AuthedLayout from './authed_layout'
import useUser from "../utils/auth/useUser";
import SubscriptionListItem from "../components/SubscriptionListItem";
import { CategoryApi } from "./api/categories";
import { DotsVerticalIcon, FolderRemoveIcon, PencilAltIcon, PlusIcon } from "@heroicons/react/outline";


function CategoryDropdown({isDropdownOpen}) {
	// const [isDropdownOpen, setIsDropDownOpen] = useState(false)

	return (
		<>
		{
			isDropdownOpen && 
				<ul className="w-32 absolute text-sm font-normal top-8 right-3 bg-white rounded-sm shadow-xl">
					<li className="border-b-2 border-gray-100 py-1 hover:bg-gray-300 px-2 cursor-pointer flex">
						<PencilAltIcon className="w-5 h-5 mr-2"/>
						Rename
					</li>
					<li className="border-gray-100 py-1 hover:bg-gray-300 px-2 cursor-pointer flex">
						<FolderRemoveIcon className="w-5 h-5 mr-2"/>
						Delete
					</li>
				</ul>
		}
		</>
	)
}

interface CategoryListItemProps {

	category: Category
	key: number
}

const CategoryListItem : React.FC<CategoryListItemProps> = ({category, key}) => {
	const [value, setValue] = useState<string>("")
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [isDropdownOpen, setIsDropDownOpen] = useState(false)

	return (
		<li key={key} className="bg-gray-100 text-lg font-bold h-28 rounded-md flex justify-center items-center relative">
			<DotsVerticalIcon 
				className="w-5 h-5 absolute text-gray-400 top-0 right-0 m-2 cursor-pointer" 
				onClick={(e) => {
					// e.preventDefault()
					e.stopPropagation()
					setIsDropDownOpen(!isDropdownOpen)
				}}
			/>
			{category.name}

			{ isDropdownOpen && <CategoryDropdown isDropdownOpen={isDropdownOpen}/> }

			{isEditing && (
				<input 
					type="text" 
					value={value === "" ? category.name : value} onChange={(e) => setValue(e.target.value)}
				/>
			)}
		</li>
	)
}

function Categories() {
	const [categories, setCategories] = useState<Category[] | [] | null>(null);

	const router = useRouter()
	const {user, isLoading, isLoggedOut = true} = useUser({
		redirectTo: '/login',
	})


	useEffect(() => {
		let mounted = true;
		async function fetchCategories() {
			try {
				const api = new CategoryApi();
				api.setup();
				const res = await api.getUserCategories();
				// console.log("USER CATEGORIES RES", res)

				// only update state if compponent is mounted
				if(res.categories && mounted) {
					setCategories([...res.categories]);
				}
			} catch (err) {
				// TODO: handle this properly
				console.log("CATEGORIES FETCH ERROR", err)
			}
		}

		if(!isLoggedOut) {
			fetchCategories()
		}

		return () => {
			mounted = false
		}
	}, [isLoggedOut])


	function handleCreateCategory(name : string) {
		if(!categories) {
			setCategories([{name}])
			return
		}

		
		setCategories([...categories, {name}])
	}


	if(isLoading) {
		return <div>Loading Dashboard...</div>
	}

	return (
		<AuthedLayout>
			<div className="py-10">
				{
					!categories ? (
						<div>Loading your Categories...</div>
					) : (
						<>
							<div className="flex justify-between items-center mb-10">
								<h1 className="text-5xl font-bold">Your Categories</h1>
								<div className="text-gray-500">{categories.length} Categories</div>
							</div>
							<ul className="grid grid-cols-3 gap-4">
								{categories.map((category, index) => (
									<CategoryListItem key={index} category={category} />
								))}

								<li 
									className="border-2 border-gray-200 text-gray-300 hover:bg-gray-100 cursor-pointer text-lg h-28 rounded-md flex justify-center items-center"
									onClick={(e) => {
										handleCreateCategory("TEST CATEGORY")
									}}
								>
									<PlusIcon className="w-6 h-6 mr-2"/>
									New Category
								</li>
							</ul>
						</>
					)

				}
			</div>
		</AuthedLayout>
	)
}



export default Categories
