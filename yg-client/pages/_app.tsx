import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SWRConfig } from "swr";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain="yg-dev.us.auth0.com"
      clientId="wL0OxZSODBa6chE5nG1jIFutMVI5jC49"
      // redirectUri={window.location.origin}
      redirectUri="http://localhost:3000"
      // redirectUri="/categories"
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
