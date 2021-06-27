import { truncateString } from "../utils/helpers";

interface VideoProps {
  title: string;
  channel: string;
  description: string;
}

const Video: React.FC<VideoProps> = ({ title, channel, description }) => (
  <li className="bg-white rounded-lg mb-5 flex h-36 overflow-hidden shadow-sm">
    {/* Video Thumbnail */}
    <div className="bg-gray-300 w-52 h-full rounded-tl-md rounded-bl-md"></div>
    {/* Video info */}
    <div className="p-4">
      <div className="font-bold truncate">{title}</div>
      <div className="text-sm mb-2">{channel}</div>
      <p className="text-sm" style={{ width: "35rem" }}>
        {truncateString(description, 230)}
      </p>
    </div>
  </li>
);

export default Video;
