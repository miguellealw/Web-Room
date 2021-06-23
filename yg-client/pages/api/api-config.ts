export interface ApiConfig {
	url: string;
	timeout: number;
}

console.log("API CONFIG", process.env.API_URL)

export const DEFAULT_API_CONFIG : ApiConfig = {
	// url: process.env.API_URL,
	timeout: 30000
}