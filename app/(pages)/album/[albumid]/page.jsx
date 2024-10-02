"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import AlbumTrack from "@/components/Global/AlbumTrack";
import { CalcTime } from "@/utils/Helpers";
import { TrackFetch } from "@/utils/Fetch";

export default function AlbumPage({ params }) {
  const { data: session } = useSession();
  const [albumTracks, setAlbumTracks] = useState([]);

  useEffect(() => {
    async function getTracks() {
      if (session) {
        const tracks = await TrackFetch("albums", params.albumid, session);
        setAlbumTracks(tracks?.items);
      }
    }
    getTracks();
  }, [session, params.albumid]);

  return (
    <>
      {albumTracks ? (
        <ul>
          {albumTracks.map((track, index) => (
            <li key={track.id}>
              <AlbumTrack
                title={track.name}
                artists={track.artists}
                time={CalcTime(track.duration_ms)}
                pos={index + 1}
                trackUri={track.uri}
                session={session}
                albumId={params.albumid}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div>No tracks found</div>
      )}
    </>
  );
}
