import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../layouts/layout";
import WaveSVG from "./WaveSVG";
import Image from "next/image";
import CategoriesImage from "../../public/categories-landing-image.png";
import { AuthApi } from "../../pages/api/auth";
import { useRouter } from "next/router";
import axios from "axios";
import { CategoryApi } from "../../pages/api/old_categories";
import { useUser } from "@auth0/nextjs-auth0";

export const LandingPage: React.FC = () => {
  const { user, error, isLoading } = useUser();

  const getCurrentUser = async () => {
    try {
      const userFetched = await axios.get(`/api/auth/check_user`);
      console.log("user fetched", userFetched);
    } catch (e) {
      console.log("ERROR FETCHING");
    }
  };

  if (isLoading) {
    <div>Loading...</div>;
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
