import { truncateString } from "../utils/helpers";

type VideoProps = {
  title: string;
  channel: string;
  description: string;
};

const Video: React.FC<VideoProps> = ({ title, channel, description }) => (
  <li className="bg-white rounded-lg mb-5 flex flex-col lg:flex-row h-56 overflow-hidden shadow-sm">
    {/* Video Thumbnail */}
    <div className="bg-gray-300 w-full lg:w-52 h-2/3 lg:h-full rounded-tl-md lg:rounded-bl-md"></div>

    {/* Video info */}
    <div className="p-4">
      <div className="font-bold truncate text-sm lg:text-base">{title}</div>
      <div className="text-xs lg:text-sm mb-2">{channel}</div>
      {/* TODO: remove description from mobile view */}
      {/* <p className="text-sm" style={{ width: "35rem" }}>
        {truncateString(description, 230)}
      </p> */}
    </div>
  </li>
);

export default Video;
