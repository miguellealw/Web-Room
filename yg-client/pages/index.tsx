import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Layout from "./layouts/layout";

const LandingPageShapeSVG = () => (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 634 634"
      className="absolute w-2/3 z-0"
      style={{
        left: "-40rem",
        top: "-5rem",
      }}
    >
      <path fill="none" d="M-16.615-10.019h653.93v661.71h-653.93z"></path>
      <path
        fill="url(#_Linear1)"
        d="M587.828 258.498c0-37.694-30.602-68.296-68.296-68.296H168.296c-37.694 0-68.296 30.602-68.296 68.296v351.236c0 37.694 30.602 68.296 68.296 68.296h351.236c37.694 0 68.296-30.602 68.296-68.296V258.498z"
        transform="rotate(45 472.079 342.46)"
      ></path>
      <defs>
        <linearGradient
          id="_Linear1"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
          gradientTransform="rotate(-45 766.3 -28.318) scale(424.936)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff"></stop>
          <stop offset="0.51" stopColor="#ffcacf"></stop>
          <stop offset="1" stopColor="#ff2638"></stop>
        </linearGradient>
      </defs>
    </svg>
  </>
);

export default function Home() {
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

        {/* <footer className="w-full h-28 flex justify-center items-center">
          YouTube+
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className="">
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a>
        </footer> */}
      </div>
    </Layout>
  );
}
