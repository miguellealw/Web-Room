import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{
      dedupingInterval: 5000
    }}>
      <Component {...pageProps} />

    </SWRConfig>
  )
}
export default MyApp
