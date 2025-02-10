import "../styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Minimurl | Encurtador de Links Rápido e Grátis</title>
        <meta name="Reduza seus links longos com nosso encurtador de URLs rápido e gratuito. Personalize, acompanhe cliques e compartilhe facilmente!" />
      </Head>
      <Component {...pageProps} />
      <GoogleTagManager gtmId="GTM-NRH72HBB" />
      <SpeedInsights />
      <Analytics />
    </>
  );
}
