import Link from "next/link"
import React, { FC } from "react"
import Logo from "../components/Logo"


const Layout : FC = ({children}) => {

	return (
		<div>
			<nav className="w-full py-5 absolute flex justify-center z-20">
				<Link href="/" passHref>
					<a className="flex items-center">
						{/* <Logo className="w-7 h-7 mr-2"></Logo> */}
						<h1 className="font-bold z-10 relative">YouTube+</h1>
					</a>
				</Link>
			</nav>
			{children}
		</div>
	)
}

export default Layout