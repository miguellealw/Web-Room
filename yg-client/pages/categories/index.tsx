import React from "react";
import AuthedLayout from '../layouts/authed_layout'
import { PlusIcon } from "@heroicons/react/outline";
import CategoryListItem from "../../components/CategoryListItem";
import Link from "next/link";
import useCategories from "../../utils/useCategories";
import { CategoryApi } from "../api/categories";

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
	const {data, error, mutateCategories, isLoading} = useCategories()

	const handleDeleteCategory = async (id : number) => {
		// update local data for optimistic update, but don't revalidate (refetch)
		mutateCategories(data => {
			const categoriesToKeep = data?.categories?.filter(category => category.id !== id)
			return {...data, categories: [...categoriesToKeep]}
		}, false)

		const api = new CategoryApi()	
		api.setup()
		await api.deleteCategory(id)

		// revalidate to make sure local data is correct
		mutateCategories()
	}

	const handleUpdateCategory = async (id : number, newName : string) => {
		// update local data for optimistic update, but don't revalidate (refetch)
		mutateCategories(data => {
			// TODO: find better way of doing this
			const categoriesToKeep = data?.categories?.filter(category => category.id !== id)
			return {
				...data, 
				categories: [
					...categoriesToKeep,
					{id, name: newName}
				]
			}
		}, false)

		const api = new CategoryApi()	
		api.setup()
		await api.updateCategory(id, newName)

		// revalidate to make sure local data is correct
		mutateCategories()
	}

	if(error) return <div>Error loading categories page...</div>

	return (
		<AuthedLayout>
			<div className="py-10">
				{
					isLoading ? (
						<div>Loading your Categories...</div>
					) : (
						<>
							<div className="flex justify-between items-center mb-10">
								<h1 className="text-5xl font-bold">Your Categories</h1>
								<div className="text-gray-500">{data?.categories?.length} Categories</div>
							</div>
							<ul className="grid grid-cols-3 gap-4">
								{data?.categories?.map((category, index) => (
									<CategoryListItem 
										key={index} 
										category={category} 
										handleDeleteCategory={handleDeleteCategory}
										handleUpdateCategory={handleUpdateCategory}
									/>
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
