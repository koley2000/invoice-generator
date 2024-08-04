import Navbar from "@/component/Navbar";
import { InvoiceProvider } from "@/context/InvoiceContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Invoice Generator</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <Navbar />
      <InvoiceProvider>
        <Component {...pageProps} />
      </InvoiceProvider>
    </>
  );
}
