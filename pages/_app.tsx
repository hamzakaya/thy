import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Providers from "@/app/providers/provider";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Head>
        <title>Turkish Airlines - Code Challenge</title>
        <meta name="author" content="Hamza KAYA" />
      </Head>
      <Component className={inter.className} {...pageProps} />
    </Providers>
  );
}
