import AuthedLayout from "../authed_layout"
import Link from "next/link";
import {ArrowNarrowLeftIcon} from "@heroicons/react/outline";


const CreateCategory = () => {

	return (

		<AuthedLayout>
			<div className="py-10">
				<Link href="/categories" passHref>
					<div className="flex mb-10 text-gray-400 hover:text-gray-600 cursor-pointer w-48">
						<ArrowNarrowLeftIcon className="w-6 h-6 mr-2"/>
						Back to Categories
					</div>
				</Link>

				<h1 className="text-5xl font-bold">Create Category</h1>

				<div className="flex flex-col mt-10">
					<div>
						<label htmlFor="name" className="text-lg font-bold block mb-1">Category Name</label>
						<input type="text" id="name" placeholder="Cooking Channels" className="w-full rounded-md p-2"/>
					</div>

					<div className="mt-4">
						<button className="bg-gray-800 hover:bg-gray-700 text-white text-lg px-5 py-1 rounded-md">Create</button>
						<button className="ml-3" > Cancel</button>
					</div>

				</div>
			</div>
		</AuthedLayout>
	)
}

export default CreateCategory