import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SWRConfig } from "swr";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SWRConfig
        value={{
          dedupingInterval: 5000,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </UserProvider>
  );
}

export default MyApp;
