import { useRouter } from "next/router"
import AuthedLayout from '../layouts/authed_layout'
import Link from "next/link";
import {ArrowNarrowLeftIcon, ExternalLinkIcon} from "@heroicons/react/outline";
import Video from '../../components/Video'
import CategorySubListItem from '../../components/CategorySubListItem'
import { Channel } from "../api/types"
import { CategoryResponse } from "../api/categories"
import useCategory from '../../utils/useCategory'
import LoadingText from "../../components/LoadingText";

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
	const router = useRouter()
	const { id } = router.query
	const {data, error, isLoading} = useCategory(id)

	if(error) return <div>Error loading category page...</div>

	return (
		<AuthedLayout tw_className="w-1/2 m-auto">
			{/* Header */}
			<div className="py-10">
				<Link href="/categories" passHref>
					<div className="flex mb-10 text-gray-400 hover:text-gray-600 cursor-pointer w-48">
						<ArrowNarrowLeftIcon className="w-6 h-6 mr-2"/>
						Back to Categories
					</div>
				</Link>

				{isLoading ? (
					<LoadingText>Loading Category...</LoadingText>
				) : (
					<>
						<div className="flex justify-between items-center mb-10">
							<h1 className="text-5xl font-bold">{data?.category?.name}</h1>
							<div>
								<span className="text-gray-500">{data?.category?.channels.length} channels</span>
								<button className="rounded-full bg-red-600 hover:bg-red-500 text-white text-xs px-4 py-2 ml-5">Add Channels</button>
							</div>
						</div>
		
						<main className="grid grid-cols-3 gap-10">
							<VideoSection data={data} />
							<SubscriptionsSection data={data}/>
						</main>
					</>
				)}
			</div>
		</AuthedLayout>
	)

}



function SubscriptionsSection({data} : {data?: CategoryResponse}) {

	return (
		<div>
			<h2 className="font-bold mb-3">Subscriptions</h2>

			{data?.category?.channels.length === 0 ? 
				(<div className="text-sm text-gray-400">No channels in category</div>) : 
				(
				<ul className="bg-white rounded-lg overflow-hidden shadow-lg p-8">
					{data?.category?.channels.map((channel : Channel) => (
						<CategorySubListItem key={channel.yt_channel_id} channel={channel}/>
					))}
				</ul>
				)	
			}
		</div>
	)
}


function VideoSection({data} : {data?: CategoryResponse}) {
	return (
		<div style={{
			gridColumnStart: '1',
			gridColumnEnd: '3'
		}}>
			<h2 className="font-bold mb-3">Videos</h2>
			{
				data?.category?.channels.length === 0 ? 
					(<div className="text-sm text-gray-400">No videos to show</div>) : 
					(
						<ul className="">
							{testVideos.map((video, index) => (
								<Video key={index} title={video.title} description={video.description} channel={video.channel}/>
							))}
						</ul>

					)

			}
		</div>
	)
}

// export async function getStaticPaths() {
// 	const api = new CategoryApi();
// 	api.setup();
// 	const res = await api.getUserCategories();
// 	console.log("GET DSTATIC PATH", res)

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