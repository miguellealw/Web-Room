export type ResourceLinks = {
	self: string,
	collection: string
}

export type User = {
	// id: number;
	username: string;
	email: string
}

export type Channel = {
	name: string,
	yt_channel_id: string,
	_links: ResourceLinks,
	yt_data: any
}

export type Category = {
	name: string,
	created_at: string,
	updated_at: string,
	_owner: string,
	_links: ResourceLinks,
	channels: Channel[]
}