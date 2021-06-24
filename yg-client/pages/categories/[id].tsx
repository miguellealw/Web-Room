import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { CategoryApi } from "../api/categories"
import AuthedLayout from '../authed_layout'
import Channels from "../channels"
import Image from "next/image"
import Link from "next/link";
import {ArrowNarrowLeftIcon, ExternalLinkIcon} from "@heroicons/react/outline";


const testVideos = [
	{
		title: "But what is a neural network? | Chapter 1, Deep learningtest video 1",
		channel: "3Blue1Brown",
		description: `What are the neurons, why are there layers, and what is the math underlying it?
Help fund future projects: https://www.patreon.com/3blue1brown
Additional funding for this project provided by Amplify Partners
An equally valuable form of support is to simply share some of the videos.
Special thanks to these supporters: http://3b1b.co/nn1-thanks`
	},
	{
		title: "A quick trick for computing eigenvalues | Chapter 15, Essence of linear algebra",
		channel: "3Blue1Brown",
		description: `How to write the eigenvalues of a 2x2 matrix just by looking at it.
Need a refresher on eigenvalues?  https://youtu.be/PFDu9oVAE-g
Thanks to Tim for the jingle: https://www.youtube.com/acapellascience
Help fund future projects: https://www.patreon.com/3blue1brown​
An equally valuable form of support is to simply share the videos.
Special thanks to these supporters: https://3b1b.co/quick-eigen-thanks`
	},
	{
		title: "Charles Hoskinson: Cardano | Lex Fridman Podcast #192",
		channel: "Lex Fridman",
		description: `Charles Hoskinson is the founder of Cardano, co-founder of Ethereum, a mathematician, and a farmer. Please support this podcast by checking out our sponsors:
- Gala Games: https://gala.games/lex
- Allform: https://allform.com/lex to get 20% off
- Indeed: https://indeed.com/lex to get $75 credit
- ExpressVPN: https://expressvpn.com/lexpod and use code LexPod to get 3 months free
- Eight Sleep: https://www.eightsleep.com/lex and use code LEX to get special savings`
	},
	{
		title: "How to Dockerize a React + Flask Application",
		channel: "Miguel Grinberg",
		description: `Learn how to deploy a web application that has a React front end and a Flask back end using Docker and Docker Compose.

Blog post: https://blog.miguelgrinberg.com/post/...
Code: https://github.com/miguelgrinberg/rea...`
	},
]

// const Category = ({ category }) => {
const Category = () => {
	const [category, setCategory] = useState()
	const router = useRouter()
	const { id } = router.query

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

	// add ... to long string
	function truncateString(str : string, maxSize : number) {
		// return (str.length > maxSize) ? `${str.substr(0, maxSize-1)}&hellip;` : str;
		return (str.length > maxSize) ? `${str.substr(0, maxSize-1)}...` : str;
	}

	function numberWithCommas(x : number) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

	return (
		<AuthedLayout tw_className="w-1/2 m-auto">
			<div className="py-10">
				<Link href="/categories" passHref>
					<div className="flex mb-10 text-gray-400 hover:text-gray-600 cursor-pointer w-48">
						<ArrowNarrowLeftIcon className="w-6 h-6 mr-2"/>
						Back to Categories
					</div>
				</Link>
				<div className="flex justify-between items-center mb-10">
					<h1 className="text-5xl font-bold">{data.category?.name}</h1>
					<div>
						<span className="text-gray-500">{data.category?.channels.length} channels</span>
						<button className="rounded-full bg-red-600 hover:bg-red-500 text-white text-xs px-4 py-2 ml-5">Add Channels</button>
					</div>
				</div>

				<main className="grid grid-cols-3 gap-10">
				{/* <main className="flex"> */}

					{/* Videos */}
					<div style={{
						gridColumnStart: '1',
						gridColumnEnd: '3'
					}}>
						<h2 className="font-bold mb-3">Videos</h2>
						{
							data.category?.channels.length === 0 ? 
								(<div className="text-sm text-gray-400">No videos to show</div>) : 
								(
									<ul className="">
										{testVideos.map((video, index) => (
											<li key={index} className="bg-white rounded-lg mb-5 flex h-36 overflow-hidden shadow-sm">
												{/* Video Thumbnail */}
												<div className="bg-gray-300 w-52 h-full rounded-tl-md rounded-bl-md"></div>
												{/* Video info */}
												<div className="p-4">
													<div className="font-bold truncate">{video.title}</div>	
													<div className="text-sm mb-2">{video.channel}</div>
													<p className="text-sm" style={{width: "35rem"}}>
														{truncateString(video.description, 230)}
													</p>
												</div>
											</li>
										))}
									</ul>

								)

						}
					</div>

					{/* Channels */}
					<div className="">
						<h2 className="font-bold mb-3">Subscriptions</h2>

						{data.category?.channels.length === 0 ? 
							(<div className="text-sm text-gray-400">No channels in category</div>) : 
							(
							<ul className="bg-white rounded-lg overflow-hidden shadow-lg p-8">
								{data.category?.channels.map(channel => (
									<li key={channel.yt_channel_id} className="py-5 bg-gray-100 mb-3 rounded-lg flex items-center pl-4">

										<div className="rounded-full w-14 h-14 bg-gray-300 overflow-hidden">
											{/* <img className="w-full h-full" src={channel.yt_data.snippet.thumbnails.default} alt={`${channel.name}'s thumbnail`} /> */}
											<Image 
												src={channel.yt_data.snippet.thumbnails.default.url} 
												alt={`${channel.name}'s thumbnail`} 
												className="w-full h-full object-cover object-center"
												width={200}
												height={200}
											/>
										</div>
										<div className="ml-3">
											<div className="font-bold text-lg">{channel.name}</div>					

											{!channel.yt_data.statistics.hiddenSubscriberCount ? (
												<div className="text-sm">{numberWithCommas(channel.yt_data.statistics.subscriberCount)} Subscribers</div>
											) : <div>channels subscriber count is not public</div>}


											<a 
												href={`https://www.youtube.com/channel/${channel.yt_channel_id}`} 
												// target="_blank" 
												className="text-xs text-gray-400 hover:underline flex"
											>
												Go to Channel

												<ExternalLinkIcon className="w-4 h-4 ml-1"/>
											</a>
										</div>

									</li>
								))}
							</ul>
							)	
						}


					</div>

				</main>
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