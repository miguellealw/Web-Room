import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SWRConfig } from "swr";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
      redirectUri="http://localhost:3000"
    >
      <SWRConfig
        value={{
          dedupingInterval: 5000,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </Auth0Provider>
  );
}

export default MyApp;
