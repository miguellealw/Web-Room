import { truncateString } from "../utils/helpers";
import Image from "next/image";
import styles from "../styles/Video.module.css";

type VideoProps = {
  title: string;
  channel: string;
  description: string;
  thumbnail: any;
  videoId: string;
};

const Video: React.FC<VideoProps> = ({
  title,
  channel,
  description,
  thumbnail,
  videoId
}) => {
  return (
    <a href={`https://www.youtube.com/watch?v=${videoId}`}>
      <li className="bg-white rounded-lg mb-5 flex flex-col lg:flex-row h-56 lg:h-40 overflow-hidden shadow-sm hover:shadow-lg">
        {/* Video Thumbnail */}
        <div
          className={`bg-gray-300 h-2/3 overflow-hidden lg:h-full rounded-tl-md lg:rounded-bl-md ${styles.videoThumbnail}`}
        >
          <Image
            src={thumbnail.url}
            alt={`${channel}'s thumbnail`}
            width={thumbnail.width}
            height={thumbnail.height}
          />
        </div>

        {/* Video info */}
        <div className="p-4">
          <div
            className="font-bold truncate text-sm lg:text-base"
            style={{
              width: "30rem",
            }}
          >
            {title}
          </div>
          <div className="text-xs lg:text-sm mb-2">{channel}</div>
          <p className="text-sm hidden lg:block" style={{ width: "30rem" }}>
            {truncateString(description, 280)}
          </p>
        </div>
      </li>
    </a>
  );
};

export default Video;
