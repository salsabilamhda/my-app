// @ts-ignore
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppShell from '@/components/layouts/AppShell'
// 1. Import Script dari next/script
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>

      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>
  );
}