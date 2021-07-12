// This is used when optimistically updating the UI before revalidating cache.
// Used when updating or creating category and client does not yet have all the data from the backend
export type TempCategory = {
  name: string;
  id?: number;
};

// The category from the back-end
export type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  _owner: string;
  _links: ResourceLinks;
  channels: Channel[];
  // TODO: make uploads type
  uploads: any;
};

