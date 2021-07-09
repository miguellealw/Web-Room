import Head from "next/head";
import Link from "next/link";
import React from "react";
import Layout from "../layouts/layout";
import WaveSVG from "./WaveSVG";
import WaveSVG2 from "./WaveSVG2";
import Image from "next/image";
import CategoriesImage from "../../public/categories-landing-image.png";

const LoginForm: React.FC = () => {
  return (
    <form
      action="post"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="w-11/12 bg-white shadow-xl rounded-md p-5 relative -top-16 lg:-top-24"
    >
      <div className="lg:w-80 m-auto">
        <h3 className="font-bold text-3xl text-center mb-5">Log In</h3>
        <div className="flex flex-col text-xs mb-6">
          <label htmlFor="username" className="uppercase font-bold">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="rounded-md border-2 border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          />
        </div>

        <div className="flex flex-col text-xs">
          <label htmlFor="password" className="uppercase font-bold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="rounded-md border-2 border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          />
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
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <Head>
          <title>YouTube+</title>
          <meta
            name="description"
            content="Categorize and Share your Favorite YouTube Channels"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* <WaveSVG className="absolute left-0 right-0 top-0 bottom-0 bg-blue-200 w-full" width="1439" height="522"/>
        <WaveSVG2 className="absolute left-0 right-0"/> */}
        <main className="min-h-screen flex-1 flex flex-col justify-center items-center z-10">
          <h1 className="text-2xl lg:text-6xl font-bold mt-24">
            A Better YouTube Experience
          </h1>
          <h2 className="text-xs lg:text-lg font-medium my-2 text-gray-400">
            Categorize and Share your Favorite YouTube Channels
          </h2>

          <Link href="/register" passHref>
            <button className="bg-red-600 hover:bg-red-500 font-bold mt-4 w-44 py-3 text-white rounded-md uppercase text-xs">
              Register
            </button>
          </Link>

          <div className="mt-5">
            <Image
              src={CategoriesImage}
              alt="Categories Example"
              width="682"
              height="353"
            />
          </div>

          <LoginForm />
        </main>
      </div>
    </Layout>
  );
};
