"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePrivy } from "@privy-io/react-auth";

const Navbar = () => {
  const { ready, authenticated, login, logout, user } = usePrivy();

  const disableLogin = !ready;

  return (
    <header className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Okto Drop
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              A simple way to airdop tokens
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            {authenticated && user ? (
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="p-4" align="start">
                  <div>
                    <p className="text-xs">
                      <span className="font-semibold"> User ID: </span>
                      {user?.id}
                    </p>

                    <br />

                    <ul>
                      {user.email ? (
                        <li className="text-xs">
                          <span className="font-semibold"> Email: </span>
                          {user.email.address}
                        </li>
                      ) : null}

                      {user.google ? (
                        <li className="text-xs">
                          <span className="font-semibold"> Google: </span>
                          {user.google.email}
                        </li>
                      ) : null}

                      {user.phone ? (
                        <li className="text-xs">
                          <span className="font-semibold"> Phone: </span>
                          {user.phone.number}
                        </li>
                      ) : null}

                      {user.wallet ? (
                        <li className="text-xs">
                          <span className="font-semibold"> Wallet: </span>
                          {user.wallet.address}
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}

            <Button
              size={"lg"}
              disabled={disableLogin}
              onClick={authenticated ? logout : login}
            >
              {authenticated ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
