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
        <meta
          name="description"
          content="Minimurl é a solução ideal para encurtar, compartilhar e monitorar links. Encurte URLs facilmente e acompanhe seus acessos!"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Minimurl - Encurtador de URL simples e rápido"
        />
        <meta
          property="og:description"
          content="Encurte seus links de forma rápida e eficiente com o Minimurl. Compartilhe e monitore acessos facilmente!"
        />
        <meta property="og:image" content="/images/social-preview.png" />
        <meta property="og:url" content="https://minimurl.com.br" />
      </Head>
      <Component {...pageProps} />
      <GoogleTagManager gtmId="GTM-NRH72HBB" />
      <SpeedInsights />
      <Analytics />
    </>
  );
}
