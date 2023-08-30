import Layout from "../components/layout";
import Link from "next/link";
import Header from "@/components/header";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

import '../app/globals.css'


const chains = [arbitrum, mainnet, polygon];
const projectId = "6b34ee74705d197441628f5eebf2e95b";


export default function MyApp({ Component, pageProps }) {
  return (
        <Layout>
          <Header />
          <Component {...pageProps} />
        </Layout>
  );
}
