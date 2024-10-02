"use client";

import Link from "next/link";
import { PlayAlbumSong } from "@/utils/Fetch";
import { useDevice } from "@/utils/DeviceContext";

export default function AlbumTrack({
  title,
  artists,
  time,
  pos,
  session,
  albumId,
}) {
  const { currentDeviceId } = useDevice();

  return (
    <div
      className="albumTrackGrid gap-4 py-2 rounded-md items-center hover:bg-spotifyGray"
      onClick={() => PlayAlbumSong(session, pos, albumId, currentDeviceId)}
    >
      <p className="text-spotifyLGray place-self-center">{pos}</p>
      <div className="overflow-hidden">
        <h2 className="text-white text-ellipsis whitespace-nowrap overflow-hidden">
          {title}
        </h2>
        <div className="flex flex-row">
          {artists.map((artist, index) => (
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
      <p className="text-spotifyLGray">{time}</p>
    </div>
  );
}
