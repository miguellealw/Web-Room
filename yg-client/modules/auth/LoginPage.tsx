import React, { useEffect, useState } from "react";
import { AuthApi } from "../../pages/api/auth";

import { useRouter } from "next/router";
import useUser from "../../shared-hooks/useUser";
import Layout from "../layouts/layout";
import Link from "next/link";
import InputField from "../../components/InputField";

export const LoginPage: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const { mutateUser } = useUser({
    redirectTo: "/channels",
    redirectIfFound: true,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    try {
      const api = new AuthApi();
      api.setup();
      const response = await api.login(username, password);

      if (response.kind === "ok") {
        mutateUser();
        router.push("/channels");
      } else {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
    }
  };

  return (
    <Layout>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-10">Login</h1>
        <form action="POST" onSubmit={onSubmit}>
          <InputField label="Username" type="text" setValue={setUsername} />
          <InputField label="Password" type="password" setValue={setPassword} />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 text-white py-2 rounded-full text-center font-bold w-full"
          >
            Log In
          </button>
        </form>

        {isError && <div>There&apos;s an error while login, try again!</div>}

        <div className="pt-2">
          Don&apos;t have an account?
          <Link href="/register" passHref>
            <a className="underline text-gray-400 pl-1">Register</a>
          </Link>
        </div>

        <div className="pt-2">I forgot my password.</div>
      </div>
    </Layout>
  );
};
