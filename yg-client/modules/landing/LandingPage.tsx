import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import WaveSVG from "./WaveSVG";
import Image from "next/image";
import CategoriesImage from "../../public/categories-landing-image.png";
// import useUser from "../../shared-hooks/useUser";
import { AuthApi } from "../../pages/api/auth";
import { useRouter } from "next/router";
import { UsersApi } from "../../pages/api/users";
import axios from "axios";
import { CategoryApi } from "../../pages/api/categories";
import { useUser } from "@auth0/nextjs-auth0";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  // const { mutateUser } = useUser({
  //   redirectTo: "/channels",
  //   redirectIfFound: true,
  // });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    try {
      const api = new AuthApi();
      api.setup();
      const response = await api.login(username, password);

      if (response.kind === "ok") {
        mutateUser();
        router.push("/categories");
      } else {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
    }
  };

  return (
    <form
      action="post"
      onSubmit={onSubmit}
      className="w-11/12 bg-white shadow-xl rounded-md p-5 relative -top-16 lg:-top-24"
    >
      <div className="lg:w-80 m-auto">
        <h3 className="font-bold text-3xl text-center mb-5">Log In</h3>
        <div className="flex flex-col text-xs mb-6">
          <label htmlFor="username" className="uppercase font-bold mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="rounded-md border-2 border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col text-xs">
          <label htmlFor="password" className="uppercase font-bold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="rounded-md border-2 border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          {isError && (
            <div className="font-bold text-sm text-red-600 mt-2">
              There&apos;s an error while login, try again!
            </div>
          )}
          {/* TODO: change to link */}
          <span className="text-xs text-gray-400 underline mt-2">
            Forgot My Password
          </span>
        </div>

        <input
          type="submit"
          value="Log In"
          className="relative -bottom-10 bg-red-600 hover:bg-red-500 text-white font-bold border-none w-full text-xs uppercase py-3 rounded-md shadow-lg cursor-pointer"
        />
      </div>
    </form>
  );
};

export const LandingPage: React.FC = () => {
  const categoriesApi = React.useMemo(() => new CategoryApi(), []);
  categoriesApi.setup();

  const { user, error, isLoading } = useUser();

  console.log("USER", user)


  const getCurrentUser = async () => {
    try {
      const userFetched = await axios.get(`/api/check_user?auth_id=${user?.sub}`)
      console.log("user fetched", userFetched)
  
      const categories = await axios.get(`/api/n_categories?auth_id=${user?.sub}`)
      console.log("categories", categories)

    } catch(e) {
      console.log("ERROR FETCHING")
    }
  };

  if(isLoading) {
    <div>Lodaing user...</div>
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center w-full">
        <Head>
          <title>YouTube+</title>
          <meta
            name="description"
            content="Categorize and Share your Favorite YouTube Channels"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <WaveSVG
          className="absolute top-56 left-0 right-0"
          width="100%"
          height="100vh"
          svgWidth="1439"
          svgHeight="522"
        />
        <main className="min-h-screen flex-1 flex flex-col justify-center items-center z-10">
          <h1 className="text-2xl lg:text-6xl font-bold mt-24">
            A Better YouTube Experience
          </h1>
          <h2 className="text-xs lg:text-lg font-medium my-2 text-gray-400">
            Categorize and Share your Favorite YouTube Channels
          </h2>

          {!user ? (
            <>
              <Link href="/register" passHref>
                <button className="bg-red-600 hover:bg-red-500 font-bold mt-4 w-44 py-3 text-white rounded-md uppercase text-xs">
                  Register
                </button>
              </Link>

              <button
                className="bg-red-600 hover:bg-red-500 font-bold mt-4 w-44 py-3 text-white rounded-md uppercase text-xs"
                onClick={() => getCurrentUser()}
              >
                Get User Info
              </button>

              <Link href="/api/auth/login" passHref>
                <a>
                  <button
                    className="bg-red-600 hover:bg-red-500 font-bold mt-4 w-44 py-3 text-white rounded-md uppercase text-xs"
                    // onClick={() => loginWithRedirect()}
                  >
                    Log In
                  </button>
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/categories" passHref>
                <button className="bg-red-600 hover:bg-red-500 font-bold mt-4 w-44 py-3 text-white rounded-md uppercase text-xs">
                  Categories
                </button>
              </Link>
              <button
                className="bg-red-600 hover:bg-red-500 font-bold mt-4 w-44 py-3 text-white rounded-md uppercase text-xs"
                onClick={() => getCurrentUser()}
              >
                Get User Info
              </button>
              <Link href="/api/auth/logout" passHref>
                <a>
                  <button
                    className="bg-red-600 hover:bg-red-500 font-bold mt-4 w-44 py-3 text-white rounded-md uppercase text-xs"
                    // onClick={() => logout({ returnTo: "http://localhost:3000" })}
                  >
                    Logout
                  </button>
                </a>
              </Link>
            </>
          )}

          <div className="mt-5">
            <Image
              src={CategoriesImage}
              alt="Categories Example"
              width="682"
              height="353"
            />
          </div>

          {/* <LoginForm /> */}
        </main>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()
  // Pass data to the page via props
  // return { props: { data } }
}
