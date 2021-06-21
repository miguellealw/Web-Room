

const ChannelDescription = ({
	name,
	description,
	thumbnail,
	channelId
}) => {

	return (
		<div className="bg-gray-100 p-4 my-4 flex items-center rounded-md">
			<div className="max-w-28 rounded-full overflow-hidden">
				<img src={thumbnail} alt={`${name}'s thumbnail`} className="w-full h-full object-cover"/>
			</div>
			<div className="flex flex-col ml-2">
				<span className="font-bold">
					{name}
				</span>

				<a 
					href={`https://www.youtube.com/channel/${channelId}`} 
					// target="_blank" 
					className="text-xs text-gray-400 hover:underline"
				>
					Go to Channel
				</a>

				{/* {
					description !== "" ? 
						description : 
						(<span className="italic text-gray-400">No description available</span>)
				} */}
			</div>
		</div>
	)
}

export default ChannelDescription