import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

// import 'tailwindcss/tailwind.css'

// TODO: may be able to remove
import { ProvideAuth } from '../utils/auth/useAuth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  )
}
export default MyApp
