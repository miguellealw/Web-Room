import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { CategoryApi } from "../api/categories"
import AuthedLayout from '../authed_layout'
import Channels from "../channels"

// const Category = ({ category }) => {
const Category = () => {
	const [category, setCategory] = useState()
	const router = useRouter()
	const {id} = router.query

	const api = new CategoryApi();
	api.setup();
  const fetcher = () => api.getUserCategoryById(id)
	const {data, error} = useSWR(`/api/v1.0/users/current_user/categories/${id}`, fetcher)

	console.log("useSWR data from category", data)
	// NOTE: seting state causes infinite loop
	// setCategory(data.category)

	if(!data) {
		return (
			<div>Loading category...</div>
		)
	}

	return (
		<AuthedLayout>
			<div className="py-10">
				<div className="flex justify-between items-center mb-10">
					<h1 className="text-5xl font-bold">{data.category?.name}</h1>
					<div className="text-gray-500">{data.category?.channels.length} channels</div>
				</div>
				<ul>
					{data.category?.channels.map(channel => (
						<li key={channel.yt_channel_id}>
							{channel.name}
						</li>
					))}
				</ul>
			</div>
		</AuthedLayout>
	)

}

// export async function getStaticPaths() {
// 	const api = new CategoryApi();
// 	api.setup();
// 	const res = await api.getUserCategories();
// 	// console.log("GET DSTATIC PATH", res)

// 	const paths = res.categories?.map((category) => ({
// 		params: { id: category.id }
// 	}))

// 	return {paths, fallback: false}
// }

// export async function getStaticProps({ params }) {
// 	const api = new CategoryApi();
// 	api.setup();
// 	const res = await api.getUserCategoryById(params.id);

// 	return { props: { category: res.category }}
// }

export default Category