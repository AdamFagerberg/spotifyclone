"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa6";

export default function AlbumCard({ imgSrc, title, artists, id }) {
  const router = useRouter();

  function handleRedirect() {
    router.push(`/album/${id}`);
  }

  function handleStop(e) {
    e.stopPropagation();
  }

  return (
    <div
      key={id}
      className="cursor-pointer relative group w-56 mb-2 bg-spotifyXLBlack hover:bg-spotifyGray rounded-md p-4"
      onClick={() => handleRedirect()}
    >
      <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 shadow-2xl shadow-spotifyBlack z-10 h-12 w-12 flex items-center justify-center rounded-full bg-spotifyGreen top-[156px] group-hover:top-[148px] right-6">
        <FaPlay className="h-6 w-6 text-spotifyBlack" />
      </div>
      {imgSrc !== "" ? (
        <Image
          className="rounded-md mb-4 w-48 h-48"
          src={imgSrc}
          alt="title"
          width={200}
          height={200}
        />
      ) : (
        <div className="w-[200px] h-[200px] rounded-md">No Image</div>
      )}
      <p className="text-base text-white mb-1 w-48 truncate">{title}</p>
      <div className="flex overflow-hidden">
        {artists.map((artist, index) => (
          <p
            className="text-spotifyLGray hover:underline text-sm text-ellipsis overflow-hidden"
            key={artist.id}
          >
            {index > 0 && ", "}
            <Link href={`/artist/${artist.id}`} onClick={(e) => handleStop(e)}>
              {artist.name}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
}
