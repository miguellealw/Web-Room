import Image from "next/image";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { useDrag } from "react-dnd";

export interface SubscriptionListItem {
  name: string;
  description?: string;
  thumbnail: any;
  channelId: string;
}

const SubscriptionListItem: React.FC<SubscriptionListItem> = ({
  name,
  description,
  thumbnail,
  channelId,
}) => {
  // return (
  // 	<div className="bg-gray-100 p-4 my-4 flex items-center">
  // 		<div className="w-20 rounded-full overflow-hidden">
  // 			<Image
  // 				src={thumbnail}
  // 				alt={`${name}'s thumbnail`}
  // 				className="w-full h-full object-cover object-center"
  // 				width={200}
  // 				height={200}
  // 			/>
  // 		</div>
  // 		<div className="flex flex-col ml-2">
  // 			<span className="font-bold">
  // 				{name}
  // 			</span>

  // 			<a
  // 				href={`https://www.youtube.com/channel/${channelId}`}
  // 				// target="_blank"
  // 				className="text-xs text-gray-400 hover:underline"
  // 			>
  // 				Go to Channel
  // 			</a>

  // 			{/* {
  // 				description !== "" ?
  // 					description :
  // 					(<span className="italic text-gray-400">No description available</span>)
  // 			} */}
  // 		</div>
  // 	</div>
  // )

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SUB_ITEM",
    item: { name, id: channelId },
    end: (item, monitor) => {
      // item - the channel
      // dropResult - the category
      const dropResult = monitor.getDropResult<{ name: string, id: string }>();
      if (item && dropResult) {
        console.log(`You dropped ${item.name}_${item.id} into ${dropResult.name}_${dropResult.id}!`);

        // TODO: Make API call here
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div
      className={`bg-white shadow-sm p-4 flex items-center rounded-md ${
        isDragging && "opacity-50"
      } hover:shadow-md`}
      ref={drag}
      role="Subscription"
    >
      <div className="w-20 rounded-full overflow-hidden">
        <Image
          src={thumbnail.url}
          alt={`${name}'s thumbnail`}
          className="w-full h-full object-cover object-center"
          width={88}
          height={88}
          // width={thumbnail.width}
          // height={thumbnail.height}
        />
      </div>
      <div className="flex flex-col ml-2">
        <span className="font-bold">{name}</span>

        <a
          href={`https://www.youtube.com/channel/${channelId}`}
          // target="_blank"
          className="text-xs text-gray-400 hover:underline flex items-center"
        >
          Go to Channel
          <ExternalLinkIcon className="w-4 h-4 ml-1" />
        </a>

        {/* {
					description !== "" ? 
						description : 
						(<span className="italic text-gray-400">No description available</span>)
				} */}
      </div>
    </div>
  );
};

export default SubscriptionListItem;
