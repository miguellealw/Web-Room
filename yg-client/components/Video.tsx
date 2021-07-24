import { truncateString } from "../utils/helpers";
import Image from "next/image";
import styles from "../styles/Video.module.css";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { useCallback, useState } from "react";
import useOnHover from "../shared-hooks/useOnHover";

type VideoProps = {
  title: string;
  channel: string;
  description: string;
  thumbnail: any;
  videoId: string;
  publishDate: string;
  channelId: string;
};

const Video: React.FC<VideoProps> = ({
  title,
  channel,
  description,
  thumbnail,
  videoId,
  publishDate,
  channelId,
}) => {
  const datePublished = new Date(publishDate);
  const { isHovering, handleMouseOut, handleMouseOver } = useOnHover();

  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noreferrer"
    >
      <li
        className="bg-white rounded-lg mb-5 flex flex-col sm:flex-row h-56 sm:h-40 overflow-hidden shadow-sm"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        title={`Watch ${title} on YouTube`}
      >
        {/* Video Thumbnail */}
        <div
          className={`bg-gray-300 lg:flex-shrink-0 h-2/3 overflow-hidden sm:h-full rounded-tl-md lg:rounded-bl-md relative ${styles.videoThumbnail}`}
        >
          <Image
            src={thumbnail.url}
            alt={`${channel}'s thumbnail`}
            width={thumbnail.width}
            height={thumbnail.height}
          />

          {isHovering && (
            <ExternalLinkIcon className="w-4 h-4 text-black bg-white absolute bottom-2 right-2" />
          )}
        </div>

        {/* Video info */}
        <div className="p-4">
          {/* Title */}
          <div
            className={`font-bold w-72 truncate text-sm lg:text-base ${styles.videoTitle}`}
          >
            {title}
          </div>

          {/* Video Channel and Date */}
          <div className="text-xs text-gray-400 lg:text-sm mb-2">
            <a
              href={`https://www.youtube.com/channel/${channelId}`}
              className="hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {channel}
            </a>
            <span className="mx-1">&#xB7;</span>
            {datePublished.toDateString()}
          </div>

          {/* Description */}
          <p
            className="text-sm hidden sm:block h-20 overflow-hidden"
            style={{ width: "30rem" }}
          >
            {description !== "" ? (
              truncateString(description, 280)
            ) : (
              <span className="text-xs text-gray-400 italic">
                No description available
              </span>
            )}
          </p>
        </div>
      </li>
    </a>
  );
};

export default Video;
