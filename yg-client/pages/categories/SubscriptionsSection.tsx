import { CategoryResponse } from "../api/categories";
import CategorySubListItem, {
  MobileCategorySubListItem,
} from "./CategorySubListItem";
import { Channel } from "../api/types";

type SubscriptionSectionProps = {
  channels?: Channel[] | undefined;
  removeChannelFromCategory: any;
  categoryId: number | undefined
};

export const MobileSubscriptionsSection: React.FC<SubscriptionSectionProps> = ({
  channels,
  removeChannelFromCategory,
  categoryId
}) => {
  return (
    <ul className="w-full overflow-x-scroll flex lg:hidden">
      {channels?.map((channel: Channel) => (
        <MobileCategorySubListItem
          key={channel.yt_channel_id}
          channel={channel}
          categoryId={categoryId}
          removeChannelFromCategory={removeChannelFromCategory}
        />
      ))}
    </ul>
  );
};

const SubscriptionsSection: React.FC<SubscriptionSectionProps> = ({
  channels,
  removeChannelFromCategory,
  categoryId
}) => {
  return (
    <div className="hidden lg:block">
      <h2 className="font-bold mb-3">Subscriptions</h2>

      {channels?.length === 0 ? (
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
            {channels?.map((channel: Channel) => (
              <CategorySubListItem
                key={channel.yt_channel_id}
                channel={channel}
                categoryId={categoryId}
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
