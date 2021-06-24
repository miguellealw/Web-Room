import {useEffect} from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { UsersApi } from '../../pages/api/users';

interface ResponseData {
  isLoading: boolean
  username?: string
}


export default function useUser({
	redirectTo = "",
	redirectIfFound = false
} = {}) {
	const api = new UsersApi();
	api.setup();
  const fetcher = () => api.currentUser()

  // const response = await api.currentUser();
	const { 
    data,  
    mutate: mutateUser 
  } = useSWR("/api/v1.0/users/current_user", fetcher);

  // console.log("useUser RAN")

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (redirectTo === "" || !data) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !data.user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && data.user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [data, redirectIfFound, redirectTo]);

  return { 
    user: data,
    isLoading: !data,
    isLoggedOut: data && !data.user.isLoggedIn,
    mutateUser 
  };
}