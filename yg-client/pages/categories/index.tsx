import React, { useEffect, useState } from "react";
import { ChannelsApi } from "../api/channels";
import { Category, Channel } from "../api/types";
import { useRouter } from 'next/router'
import AuthedLayout from '../layouts/authed_layout'
import useUser from "../../utils/auth/useUser";
import SubscriptionListItem from "../../components/SubscriptionListItem";
import { CategoryApi } from "../api/categories";
import { DotsVerticalIcon, FolderRemoveIcon, PencilAltIcon, PlusIcon } from "@heroicons/react/outline";
import CategoryListItem from "../../components/CategoryListItem";
import Link from "next/link";

// const NewCategoryButton = ({handleCreateCategory}) => (
const NewCategoryButton = () => (
	<Link href="/categories/create" passHref>
		<li 
			className="hover:bg-gray-50 border-2 border-gray-200 text-gray-300 cursor-pointer text-lg h-28 rounded-md flex justify-center items-center"
		>
			<PlusIcon className="w-6 h-6 mr-2"/>
			New Category
		</li>
	</Link>
)

function Categories() {
	const [categories, setCategories] = useState<Category[] | null>(null);

	const router = useRouter()
	const {isLoggedOut = true} = useUser()


	useEffect(() => {
		let mounted = true;
		async function fetchCategories() {
			try {
				const api = new CategoryApi();
				api.setup();
				const res = await api.getUserCategories();
				console.log("USER CATEGORIES RES", res)

				// only update state if compponent is mounted
				if(res.categories && mounted) {
					setCategories([...res.categories]);
				}
			} catch (err) {
				// TODO: handle this properly
				console.log("CATEGORIES FETCH ERROR", err)
			}
		}

		// if(!isLoggedOut) {
			fetchCategories()
		// }

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

								<NewCategoryButton />
							</ul>
						</>
					)

				}
			</div>
		</AuthedLayout>
	)
}



export default Categories
