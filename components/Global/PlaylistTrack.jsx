"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayPlaylistSong } from "@/utils/Fetch";
import { useDevice } from "@/utils/DeviceContext";

export default function PlaylistTrack({
  imgSrc,
  title,
  artists,
  album,
  time,
  pos,
  path,
  playlistId,
  session,
}) {
  const { currentDeviceId } = useDevice();

  return (
    <div
      className="playlistTrackGrid gap-4 py-2 rounded-md items-center hover:bg-spotifyGray"
      onDoubleClick={() =>
        PlayPlaylistSong(session, pos, playlistId, currentDeviceId)
      }
    >
      <p className="text-spotifyLGray place-self-center">{pos}</p>
      <Image
        className="rounded-md p-1"
        src={imgSrc}
        width={100}
        height={100}
        alt={title}
        style={{ minWidth: 100 }}
      />
      <div className="overflow-hidden select-none">
        <h2 className="text-white text-ellipsis whitespace-nowrap overflow-hidden">
          {title}
        </h2>
        <div className="flex flex-row">
          {artists?.map((artist, index) => (
            <p
              className="text-spotifyLGray hover:underline text-ellipsis whitespace-nowrap overflow-hidden"
              key={artist.id}
            >
              {index > 0 && ", "}
              <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
            </p>
          ))}
        </div>
      </div>
      <Link
        href={`/album/${path}`}
        className="text-spotifyLGray hover:underline"
      >
        {album}
      </Link>
      <p className="text-spotifyLGray">{time}</p>
    </div>
  );
}
