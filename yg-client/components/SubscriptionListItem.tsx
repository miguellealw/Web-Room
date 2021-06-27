import Image from "next/image";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { useDrag } from "react-dnd";
import { CategoryApi } from "../pages/api/categories";

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
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SUB_ITEM",
    item: { name, id: channelId },
    end: (channel, monitor) => {
      // item - the channel
      // dropResult - the category
      const category = monitor.getDropResult<{ name: string, id: string }>();
      if (channel && category) {
        console.log(`You dropped ${channel.name}_${channel.id} into ${category.name}_${category.id}!`);

        // TODO: Make API call here
        const api = new CategoryApi()
        api.setup()
        api.addChannelToCategory(category.id, channel.name, channel.id)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div
      className={`bg-white translate shadow-sm p-4 flex flex-col lg:flex-row items-center rounded-md ${
        isDragging && "translate opacity-50 transform scale-90"
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
