export interface ApiConfig {
	url: string;
	timeout: number;
}

export const DEFAULT_API_CONFIG: ApiConfig = {
	url: process.env.API_URL,
	// url: 'http://localhost:5000',
	timeout: 30000
}