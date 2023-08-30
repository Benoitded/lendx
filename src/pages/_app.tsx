import Layout from "../components/layout";
import Link from "next/link";
import Header from "@/components/header";
import { AppProps } from 'next/app'

import '../app/globals.css'


export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
          <Header />
          <Component {...pageProps} />
        </Layout>
  );
}
