import { useEffect } from "react";
import Image from "next/image";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { useDrag } from "react-dnd";
import { CategoryApi } from "../api/categories";
import { getEmptyImage } from "react-dnd-html5-backend";

export interface SubscriptionListItem {
  name: string;
  description?: string;
  thumbnail: any;
  channelId: string;
  // addChannelToCategory: (categoryId: string, channelName: string, channelId: string) => void;
}

const SubscriptionListItem: React.FC<SubscriptionListItem> = ({
  name,
  description,
  thumbnail,
  channelId,
}) => {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "SUB_ITEM",
    item: { name, id: channelId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  });

  return (
    <div
      className={`bg-black translate shadow-sm flex flex-col lg:flex-row items-center rounded-md hover:shadow-md overflow-hidden relative ${
        isDragging && "translate opacity-50 transform scale-90"
      }`}
      ref={drag}
      role="Subscription"
    >
      <Image
        src={thumbnail.url}
        alt={`${name}'s thumbnail`}
        className="w-full h-full object-cover object-center cursor-move transition opacity-30 hover:opacity-60"
        width={200}
        height={200}
      />

      {/* Name */}
      <span className="font-bold w-32 truncate text-sm lg:font-base absolute bottom-2 left-2 text-white">
        {name}
      </span>
    </div>
  );
};

export default SubscriptionListItem;
