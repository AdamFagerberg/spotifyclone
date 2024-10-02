"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CalcTime } from "@/utils/Helpers";

import PlaylistTrack from "@/components/Global/PlaylistTrack";
import { TrackFetch } from "@/utils/Fetch";

export default function PlaylistPage({ params }) {
  const { data: session } = useSession();

  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    async function getTracks() {
      if (session?.accessToken) {
        const tracks = await TrackFetch(
          "playlists",
          params?.playlistid,
          session
        );
        setPlaylistTracks(tracks?.items);
      }
    }
    getTracks();
  }, [session, params?.playlistid]);

  return (
    <>
      {playlistTracks && playlistTracks?.length > 0 && (
        <ul>
          {playlistTracks?.map((track, index) => (
            <li key={track?.track?.id}>
              <PlaylistTrack
                key={track?.track?.id}
                imgSrc={track?.track?.album?.images[0].url}
                title={track?.track?.name}
                artists={track?.track?.artists}
                album={track?.track?.album?.name}
                time={CalcTime(track?.track?.duration_ms)}
                pos={index + 1}
                path={track?.track?.album?.id}
                playlistId={params?.playlistid}
                session={session}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
