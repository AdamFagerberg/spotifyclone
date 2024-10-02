"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SidePlaylist({ imgSrc, title, type, owner, path }) {
  const router = useRouter();

  function handleRedirect() {
    router.push(`/playlist/${path}`);
  }

  return (
    <div
      className="mb-2 hover:bg-spotifyGray hover:cursor-pointer rounded-md grid grid-cols-3 grid-rows-1 gap-2 max-md:grid-cols-1"
      onClick={() => handleRedirect()}
    >
      <div className="flex justify-center">
        <Image
          className="rounded-md p-1"
          src={imgSrc}
          width={100}
          height={100}
          alt={title}
        />
      </div>
      <div className="overflow-hidden self-center col-span-2 max-md:hidden">
        <h2 className="text-ellipsis whitespace-nowrap overflow-hidden mb-1">
          {title}
        </h2>
        <p className="text-ellipsis whitespace-nowrap overflow-hidden text-spotifyLGray text-sm">
          {`${type} • ${owner}`}
        </p>
      </div>
    </div>
  );
}
