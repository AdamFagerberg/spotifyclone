"use client";

import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();

  function handleSearch(e) {
    if (e.target.value !== "") {
      router.push(`/search/${e.target.value}`);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="text-spotifyBlack">
      <input
        placeholder="Search"
        type="text"
        onChange={(e) => handleSearch(e)}
        className="appearance-none w-full bg-spotifyGray border border-spotifyBlack hover:border-spotifyLGray rounded-md placeholder-spotifyLGray text-center p-1"
      />
    </div>
  );
}
