import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import LogoutButton from "./logoutButton";
import { getUser } from "@/auth/server";
import { SidebarTrigger } from "./ui/sidebar";

const Header = async () => {
  const user = await getUser();

  return (
    <header className="bg-popover relative flex h-24 w-full items-center justify-between px-3 shadow-2xl shadow-cyan-500/50 sm:px-8">
      <SidebarTrigger className="absolute top-1 left-1" />

      <Link href="/" className="flex items-end gap-2">
        <Image
          src="/apple-touch-icon.png"
          height={60}
          width={60}
          alt="logo"
          className="rounded-full"
          priority
        />

        <h1 className="flex flex-col text-2xl leading-6">
          AI <span> Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <Button asChild>
              <Link href="/signup" className="hidden sm:block">
                Sign-Up
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
