import { CategoryResponse } from "../api/categories";
import Video from "../../components/Video";
import styles from "../../styles/Video.module.css";

const testVideos = [
  {
    title:
      "But what is a neural network? | Chapter 1, Deep learningtest video 1",
    channel: "3Blue1Brown",
    description: `What are the neurons, why are there layers, and what is the math underlying it?
Help fund future projects: https://www.patreon.com/3blue1brown
Additional funding for this project provided by Amplify Partners
An equally valuable form of support is to simply share some of the videos.
Special thanks to these supporters: http://3b1b.co/nn1-thanks`,
  },
  {
    title:
      "A quick trick for computing eigenvalues | Chapter 15, Essence of linear algebra",
    channel: "3Blue1Brown",
    description: `How to write the eigenvalues of a 2x2 matrix just by looking at it.
Need a refresher on eigenvalues?  https://youtu.be/PFDu9oVAE-g
Thanks to Tim for the jingle: https://www.youtube.com/acapellascience
Help fund future projects: https://www.patreon.com/3blue1brown​
An equally valuable form of support is to simply share the videos.
Special thanks to these supporters: https://3b1b.co/quick-eigen-thanks`,
  },
  {
    title: "Charles Hoskinson: Cardano | Lex Fridman Podcast #192",
    channel: "Lex Fridman",
    description: `Charles Hoskinson is the founder of Cardano, co-founder of Ethereum, a mathematician, and a farmer. Please support this podcast by checking out our sponsors:
- Gala Games: https://gala.games/lex
- Allform: https://allform.com/lex to get 20% off
- Indeed: https://indeed.com/lex to get $75 credit
- ExpressVPN: https://expressvpn.com/lexpod and use code LexPod to get 3 months free
- Eight Sleep: https://www.eightsleep.com/lex and use code LEX to get special savings`,
  },
  {
    title: "How to Dockerize a React + Flask Application",
    channel: "Miguel Grinberg",
    description: `Learn how to deploy a web application that has a React front end and a Flask back end using Docker and Docker Compose.

Blog post: https://blog.miguelgrinberg.com/post/...
Code: https://github.com/miguelgrinberg/rea...`,
  },
];

type VideoSectionProps = {
  data?: CategoryResponse;
  uploads: any;
};

// Uploads - contains last 5 uploads of the channels in the category
const VideoSection: React.FC<VideoSectionProps> = ({ uploads }) => {
  console.log("DATA FROM BACKEND", uploads);

  return (
    <div className={`w-full ${styles.videoSection}`}>
      {!uploads ? (
        <div>Loading</div>
      ) : (
        <>
          <h2 className="font-bold mb-3">Videos</h2>
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
        </>
      )}
    </div>
  );
};

export default VideoSection;
