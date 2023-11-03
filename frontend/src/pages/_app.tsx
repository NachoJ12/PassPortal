import '@/styles/globals.css'
import '@/styles/form.css'
import '@/styles/ui/cardEvent.css'

import type { AppProps } from 'next/app'
import { SidebarProvider } from "@/components/context/sidebar-context"
import SessionAuthProvider from '@/components/context/SessionAuthProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionAuthProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </SessionAuthProvider>
  )
}