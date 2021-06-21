import Link from "next/link"
import React, { FC } from "react"


const Layout : FC = ({children}) => {

	return (
		<div>
			<nav className="w-full text-center py-5 absolute">
				<Link href="/" passHref>
					<a>
						<h1 className="font-bold">YouTube+</h1>
					</a>
				</Link>
			</nav>
			{children}
		</div>
	)
}

export default Layout