import React, { useEffect, useState } from "react";
import { ChannelsApi } from "./api/channels";
import { Channel } from "./api/types";
import Link from 'next/link'
import { AuthApi } from "./api/auth";
import {useRouter} from 'next/router'

function Channels() {
	const [channels, setChannels] = useState<Channel[] | []>([]);
	const router = useRouter()

	useEffect(() => {
		async function fetchChannels() {
			try {
				const api = new ChannelsApi();
				api.setup();
				const response = await api.get_channels();
				setChannels([...response.channels]);
			} catch (err) {
				console.log("CHANNELS FETCH ERROR", err)
			}
		}

		fetchChannels()
	}, [])

	const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const api = new AuthApi();
		api.setup();
		const response = await api.logout()

		router.push('/login')
	}

	return (
		<div>
			<button onClick={handleLogout}>Logout</button>	
			<Link href="/login">
				<button>Login</button>	
			</Link>
			<h1>User Channels</h1>
			<ul>
				{channels.map((channel, index) => (
					<li key={index}><strong>{channel.name}</strong> - {channel.yt_data.snippet.description}</li>
				))}
			</ul>
		</div>
	)
}



export default Channels
