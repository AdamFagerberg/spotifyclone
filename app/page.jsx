"use client";

import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-spotifyBlack">
      <h1 className="text-white font-semibold text-5xl mb-10">SPOTIFY?</h1>
      <button
        className="bg-spotifyGreen hover:bg-green-500 text-spotifyBlack hover:text-spotifyLBlack py-8 px-16 rounded-full text-2xl font-semibold"
        onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}
      >
        Sign in
      </button>
    </div>
  );
}
