import Head from "next/head";
import Link from "next/link";
import React from "react";
import Layout from "../layouts/layout";
import WaveSVG from "./WaveSVG";
import Image from "next/image";
import CategoriesImage from "../../public/categories-landing-image.png";
import { useUser } from "@auth0/nextjs-auth0";
import Button from "../../components/Button";
import { LoginIcon } from "@heroicons/react/outline";

export const LandingPage: React.FC = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center w-full bg-gray-50">
        <Head>
          <title>YouTube+</title>
          <meta
            name="description"
            content="Categorize and Share your Favorite YouTube Channels"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* <WaveSVG
          className="absolute top-56 left-0 right-0"
          width="100%"
          height="100vh"
          svgWidth="1439"
          svgHeight="522"
        /> */}
        <main className="min-h-screen flex-1 flex flex-col justify-center items-center z-10">
          <h1 className="text-2xl lg:text-6xl font-bold mt-24">
            A Better YouTube Experience
          </h1>
          <h2 className="text-xs lg:text-lg font-medium my-2 text-gray-400">
            {/* Categorize and Share your Favorite YouTube Channels */}
            Categorize your Favorite YouTube Channels
          </h2>

          {!user ? (
            <>
              <Link href="/api/auth/login" passHref>
                <a>
                  <Button tw_className="font-bold uppercase text-xs flex justify-center items-center">
                    <>
                      Log In
                      <LoginIcon className="w-5 h-5 ml-2" />
                    </>
                  </Button>
                </a>
              </Link>
            </>
          ) : (
            <div className="flex">
              <Link href="/categories" passHref>
                <a>
                  <Button tw_className="font-bold uppercase text-xs mr-3 w-36">
                    Your Categories
                  </Button>
                </a>
              </Link>
              <Link href="/api/auth/logout" passHref>
                <a>
                  <Button tw_className="font-bold uppercase text-xs">
                    Logout
                  </Button>
                </a>
              </Link>
            </div>
          )}

          <div className="mt-5">
            <Image
              src={CategoriesImage}
              alt="Categories Example"
              width="682"
              height="353"
            />
          </div>
        </main>
      </div>
    </Layout>
  );
};
