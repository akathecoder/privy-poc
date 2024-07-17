"use client";

import { TransferForm } from "@/components/card/card";
import Navbar from "@/components/navbar/navbar";
import { usePrivy } from "@privy-io/react-auth";

export default function Home() {
  const { ready, authenticated, user } = usePrivy();

  if (!ready) {
    return <></>;
  }

  if (ready && !authenticated) {
    return (
      <main className="">
        <Navbar />

        <div className="text-center p-96">
          <p className="text-3xl font-bold italic ">
            Please Log in to continue . . .
          </p>
        </div>
      </main>
    );
  }

  if (ready && authenticated) {
    return (
      <main className="">
        <Navbar />

        <div className="p-16">
          <TransferForm />
        </div>
      </main>
    );
  }
}
