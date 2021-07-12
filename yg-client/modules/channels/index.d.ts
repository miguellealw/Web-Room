export type ResourceLinks = {
  self: string;
  collection: string;
};

export type Channel = {
  name: string;
  yt_channel_id: string;
  _links: ResourceLinks;
  yt_data: any;
};