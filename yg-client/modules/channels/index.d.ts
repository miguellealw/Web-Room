import { youtube_v3 } from "../youtube";

// TODO: implement yt_data type
export type YT_Data = any

export type Channel = {
  name: string;
  yt_channel_id: string;
  _links: {
    self: string;
    collection: string;
  };
  categories: number[];
  yt_data: YT_Data;
  // For when channel is not in db
  message?: string
};
