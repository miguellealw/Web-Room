export type ResourceLinks = {
  self: string;
  collection: string;
};

export type Channel = {
  name: string;
  yt_channel_id: string;
  _links: ResourceLinks;
  categories: number[];
  yt_data: any;
};
