import '@/styles/globals.css'
import '@/styles/ui/cards/cardEvent.css'
import "@/styles/layoutCss/sideBar.css"
import "@/styles/layoutCss/footer.css"
import "@/styles/layoutCss/navbar.css"
import '@/styles/ui/cards/cardUpcoming.css'
import '@/styles/ui/cards/cardShows.css'
import '@/styles/ui/cards/cardEventReservation.css'
import '@/styles/ui/carousel.css'
import '@/styles/ui/searchbar.css'
import '@/styles/ui/checkout.css'

import "@/styles/layoutCss/login-register.css"
import '@/styles/ui/cards/cardProfile.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CardProfile } from '@/components/ui/cardGeneral/cardProfile/cardProfile';
import '@/styles/globals.css'; // Importa tus estilos globales aquí
import type { AppProps } from 'next/app';
import { SidebarProvider } from '@/components/context/sidebar-context';
import SessionAuthProvider from '@/components/context/SessionAuthProvider';
import { CheckoutProvider } from '@/components/context/checkout-context'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  useEffect(() => {
    // Oculta el perfil al cambiar de página
    setIsProfileVisible(false);
  }, [router.pathname]);
  return (
    <CheckoutProvider>
    {isProfileVisible && <CardProfile onClose={() => setIsProfileVisible(false)} />}
    <SessionAuthProvider>
      <SidebarProvider>
        <Component {...pageProps} onUsernameClick={() => setIsProfileVisible(true)} />
      </SidebarProvider>
    </SessionAuthProvider>
  </CheckoutProvider>
  );
}
