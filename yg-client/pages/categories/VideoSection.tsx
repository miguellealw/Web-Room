import { CategoryResponse } from "../api/categories";
import Video from "../../components/Video";
import styles from "../../styles/Video.module.css";

type VideoSectionProps = {
  data?: CategoryResponse;
  uploads: any;
};

// Uploads - contains last 5 uploads of the channels in the category
const VideoSection: React.FC<VideoSectionProps> = ({ uploads }) => {
  return (
    <div className={`w-full ${styles.videoSection}`}>
      <div className="my-5 lg:mb-5 lg:mt-0">
        <h2 className="text-gray-500 text-sm uppercase font-bold inline-block tracking-wider">
          Videos
        </h2>
        <span className="mx-2 text-gray-500">&#xB7;</span>
        <span className="cinline-block text-sm text-gray-500">
          The 5 Most Recent Videos of Each Channel
        </span>
      </div>

      {uploads?.length === 0 ? (
        <div className="text-sm text-gray-400">No videos to show</div>
      ) : (
        <ul className="">
          {/* {testVideos.map((video, index) => ( */}
          {uploads?.map((upload) => (
            <Video
              key={upload.id}
              title={upload.snippet.title}
              description={upload.snippet.description}
              channel={upload.snippet.channelTitle}
              channelId={upload.snippet.channelId}
              thumbnail={upload.snippet.thumbnails.high}
              videoId={upload.snippet.resourceId.videoId}
              publishDate={upload.snippet.publishedAt}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideoSection;
