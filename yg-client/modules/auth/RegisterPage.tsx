import React, { useState } from "react";
import { AuthApi } from "../../pages/api/auth";
import InputField from "../../components/InputField";

import { useRouter } from "next/router";
import Layout from "../layouts/layout";
import Link from "next/link";

export const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    let response;
    try {
      const api = new AuthApi();
      api.setup();
      response = await api.register(username, email, password, confirmPassword);

      console.log("RESPONSEP", response);

      if (response.kind === "ok") {
        router.push("/channels");
      } else {
        setIsError(true);
        setErrorMessage(response.errorMessage);
      }

      console.log(errorMessage);
    } catch (err) {
      setIsError(true);
      setErrorMessage(response.errorMessage);
    }
  };

  return (
    <Layout>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-10">Register</h1>
        <form action="POST" onSubmit={onSubmit}>
          <InputField label="Email" type="email" setValue={setEmail} />
          <InputField label="Username" type="text" setValue={setUsername} />
          <InputField label="Password" type="password" setValue={setPassword} />
          <InputField
            label="ConfirmPassword"
            type="password"
            setValue={setConfirmPassword}
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 rounded-full text-white py-2  text-center font-bold w-full"
          >
            Register
          </button>
        </form>

        {isError && (
          <div>
            There&apos;s an error while login, try again!
            <div>{JSON.stringify(errorMessage)}</div>
          </div>
        )}

        <div className="pt-2">
          Already have an account?
          <Link href="/login" passHref>
            <a className="underline text-gray-400 pl-1">Log In</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
