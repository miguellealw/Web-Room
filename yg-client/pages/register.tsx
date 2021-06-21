import React, { useState, FunctionComponent } from "react"
import { AuthApi } from './api/auth'

import {useRouter} from 'next/router'

const Register : FunctionComponent = () => {
	const router = useRouter()
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState({})

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
		let response
    try {
      const api = new AuthApi();
      api.setup();
      response = await api.register(username, email, password, confirmPassword);

			console.log("RESPONSEP", response)

      if (response.kind === "ok") {
				router.push('/channels')
      } else {
        setIsError(true);
				setErrorMessage(response.errorMessage)
      }

			console.log(errorMessage)

    } catch (err) {
      setIsError(true);
			setErrorMessage(response.errorMessage)
    }
  };


	return (
		<div>
			<form action="POST" onSubmit={onSubmit}>
				<div>
					<label htmlFor="email">Email</label>
					<input 
						type="text" 
						id="email" 
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setUsername(e.target.value)
						}}
					/>
				</div>

				<div>
					<label htmlFor="username">Username</label>
					<input 
						type="text" 
						id="username" 
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setEmail(e.target.value)
						}}
					/>
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input 
						type="password" 
						id="password"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setPassword(e.target.value)
						}}
					
					/>
				</div>

				<div>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input 
						type="password" 
						id="confirmPassword"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setConfirmPassword(e.target.value)
						}}
					
					/>
				</div>


				<div>
					<button type="submit">Register</button>
				</div>
			</form>

			{isError && (
					<div>
						There`&apos`s an error while login, try again!
						<div>
							{/* {JSON.stringify(errorMessage)} */}
							{JSON.stringify(errorMessage)}
						</div>
					</div>
				)}
		</div>
	)


}


export default Register