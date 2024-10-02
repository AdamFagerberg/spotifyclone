"use client";

import { useSession } from "next-auth/react";
import { SearchFetch } from "@/utils/Fetch";
import { useEffect, useState } from "react";

import ArtistCard from "@/components/Global/ArtistCard";
import PlaylistCard from "@/components/Global/PlaylistCard";
import SearchPageTrack from "@/components/SearchPage/SearchPageTrack";
import TopResult from "@/components/SearchPage/TopResult";

export default function SearchPage({ params }) {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState(null);
  const [artists, setArtists] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    if (session?.accessToken) {
      async function getSearch() {
        const data = await SearchFetch(session, params.query);
        setArtists(data?.artists?.items);
        setPlaylists(data?.playlists?.items);
        setTracks(data?.tracks?.items);
      }
      getSearch();
    }
  }, []);

  return (
    <div className="flex flex-col gap-8 px-8 h-screen overflow-y-scroll text-white">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Top result</h2>
          <div className="h-64 pr-8">
            {playlists && (
              <TopResult
                key={playlists[0].id}
                imgSrc={playlists[0].images[0].url}
                title={playlists[0].name}
                owner={playlists[0].owner.display_name}
                id={playlists[0].id}
              />
            )}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Top tracks</h2>
          <div className="flex flex-col">
            {tracks?.slice(0, 4).map((track) => {
              return (
                <SearchPageTrack
                  key={track.id}
                  id={track.id}
                  imgSrc={track?.album?.images[0].url}
                  title={track.name}
                  artists={track?.artists}
                  duration={track.duration_ms}
                  uri={track.uri}
                  session={session}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4 text-white">
        <h2 className="text-xl font-bold">Artists</h2>
        <div className="flex flex-wrap gap-4">
          {artists?.slice(0, 4).map((artist) => {
            return (
              <ArtistCard
                key={artist.id}
                id={artist.id}
                imgSrc={artist?.images[0]?.url}
                name={artist.name}
              />
            );
          })}
        </div>
      </div>
      <div className="space-y-4 mb-48 text-white">
        <h2 className="text-xl font-bold">Playlists</h2>
        <div className="flex flex-wrap gap-4">
          {playlists?.slice(0, 4).map((playlist) => {
            return (
              <PlaylistCard
                key={playlist.id}
                id={playlist.id}
                imgSrc={playlist?.images[0].url}
                title={playlist.name}
                owner={playlist.owner.display_name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
