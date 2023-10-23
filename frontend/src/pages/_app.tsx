import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SidebarProvider} from "@/components/context/sidebar-context"

export default function App({ Component, pageProps }: AppProps) {
  return(
    <SidebarProvider>
    <Component {...pageProps} />
    </SidebarProvider> 
  )
}
