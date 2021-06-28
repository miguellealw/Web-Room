import { CategoryResponse } from "../api/categories";
import CategorySubListItem from "./CategorySubListItem";
import { Channel } from "../api/types";

type SubscriptionSectionProps = {
  data?: CategoryResponse;
  removeChannelFromCategory: any;
};

const SubscriptionsSection: React.FC<SubscriptionSectionProps> = ({
  data,
  removeChannelFromCategory,
}) => {
  return (
    <div>
      <h2 className="font-bold mb-3">Subscriptions</h2>

      {data?.category?.channels.length === 0 ? (
        <div className="text-sm text-gray-400">No channels in category</div>
      ) : (
        <div
          className="bg-white rounded-lg shadow-lg p-8 overflow-y-scroll"
          style={{
            maxHeight: "42rem",
          }}
        >
          <div>
            <label
              htmlFor="searchSubs"
              className="text-sm text-gray-400 font-bold block mb-1"
            >
              Search
            </label>
            <input
              type="text"
              id="searchSubs"
              placeholder="Not working yet..."
              className="w-full rounded-md mb-5 py-2"
              style={{ textIndent: ".5rem" }}
            />
          </div>
          <ul>
            {data?.category?.channels.map((channel: Channel) => (
              <CategorySubListItem
                key={channel.yt_channel_id}
                channel={channel}
                categoryId={data?.category?.id}
                removeChannelFromCategory={removeChannelFromCategory}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsSection;
