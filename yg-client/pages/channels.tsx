import React, { useEffect, useState } from "react";
import { ChannelsApi } from "./api/channels";
import { Channel } from "./api/types";
import Link from 'next/link'
import { AuthApi } from "./api/auth";
import { useRouter } from 'next/router'
import { useAuth } from '../utils/auth/useAuth'

function Channels() {
	const [channels, setChannels] = useState<Channel[] | [] | null>(null);
	const {isLoggedIn, currentUser} = useAuth()
	const router = useRouter()

	useEffect(() => {
		if(!isLoggedIn) {
			router.push('/login')
		}

		let mounted = true;
		async function fetchChannels() {
			try {
				const api = new ChannelsApi();
				api.setup();
				const response = await api.get_channels();

				// only update state if component is mounted
				if(mounted)
					setChannels([...response.channels]);
			} catch (err) {
				console.log("CHANNELS FETCH ERROR", err)
			}
		}

		fetchChannels()

		return () => {
			mounted = false
		}
	}, [])

	const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const api = new AuthApi();
		api.setup();
		const response = await api.logout()

		router.push('/login')
	}

	return (
		<div>
			{
				!channels ? (
					<div>Loading...</div>
				) : (
					<>
					<button onClick={handleLogout}>Logout</button>	
					<Link href="/login" passHref>
						<button>Login</button>	
					</Link>
					<h1>User Channels</h1>
					<ul>
						{channels.map((channel, index) => (
							<li key={index}><strong>{channel.name}</strong> - {channel.yt_data.snippet.description}</li>
						))}
					</ul>
					</>
				)

			}
		</div>
	)
}



export default Channels
