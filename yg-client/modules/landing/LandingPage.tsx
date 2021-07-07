import Head from "next/head";
import Link from "next/link";
import React from "react";
import Layout from "../layouts/layout";

export const LandingPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex px-5 flex-col justify-center items-center min-h-screen">
        <Head>
          <title>YouTube+</title>
          <meta
            name="description"
            content="Categorize and Share your Favorite YouTube Channels"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* <LandingPageShapeSVG /> */}
        <main className="min-h-screen flex-1 flex flex-col justify-center items-center z-10">
          <h1 className="text-7xl font-bold">A Better YouTube Experience</h1>
          <h2 className="text-2xl font-medium my-3">
            Categorize and Share your Favorite YouTube Channels
          </h2>
          <Link href="/login" passHref>
            <button className="bg-red-600 hover:bg-red-500 font-bold mt-4 w-40 py-2 px-10 text-white rounded-full">
              Login
            </button>
          </Link>
          <span>
            <Link href="/register" passHref>
              <a>
                or <span className="underline text-gray-400">Register </span>
              </a>
            </Link>
          </span>
        </main>
      </div>
    </Layout>
  );
};
