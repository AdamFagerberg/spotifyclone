"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import Search from "./Search";

export default function NavBar() {
  const router = useRouter();

  function handleRedirect() {
    router.push("/dashboard");
  }

  return (
    <nav className="navbar text-white bg-spotifyLBlack grid grid-cols-3 content-center align-middle justify-center">
      <button onClick={() => handleRedirect()}>Home</button>
      <Search />
      <button onClick={() => signOut({ callbackUrl: "/" })}>Log out</button>
    </nav>
  );
}
