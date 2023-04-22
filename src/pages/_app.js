import { ProductProvider } from '@/contexts/ProductContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ProductProvider>
      <Component {...pageProps} />
    </ProductProvider>
  )
}
