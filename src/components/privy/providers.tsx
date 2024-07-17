"use client";

import { defaultChain, supportedChains } from "@/lib/supportedChains";
import { PrivyProvider } from "@privy-io/react-auth";
import OktoIcon from "./okto-icon";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="clypm1x2b0be4yysbvor4ikgy"
      config={{
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: OktoIcon(),
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },

        defaultChain: defaultChain,
        supportedChains: supportedChains,
      }}
    >
      {children}
    </PrivyProvider>
  );
}
