"use client";

import {
  ArtistRelated,
  ArtistTopTracks,
  ArtistFetch,
  ArtistAlbums,
} from "@/utils/Fetch";
import { CheckVisibility } from "@/utils/Helpers";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

import SearchPageTrack from "@/components/SearchPage/SearchPageTrack";
import ArtistCard from "@/components/Global/ArtistCard";
import ArtistBanner from "@/components/Global/ArtistBanner";
import AlbumCard from "@/components/Global/AlbumCard";

export default function ArtistPage({ params }) {
  const { data: session } = useSession();

  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [related, setRelated] = useState([]);
  const [albums, setAlbums] = useState([]);

  const artistsContainerRef = useRef(null);
  const albumsContainerRef = useRef(null);

  useEffect(() => {
    if (session?.accessToken) {
      async function getArtist() {
        const artistData = await ArtistFetch(session, params.artistid);
        const artistTracks = await ArtistTopTracks(session, params.artistid);
        const artistRelated = await ArtistRelated(session, params.artistid);
        const artistAlbums = await ArtistAlbums(session, params.artistid);

        setArtist(artistData);
        setTracks(artistTracks?.tracks);
        setRelated(artistRelated?.artists);
        setAlbums(artistAlbums?.items);
      }
      getArtist();
    }
  }, [session, params.artistid]);

  useEffect(() => {
    const handleResize = () => {
      CheckVisibility(artistsContainerRef, ".artistpage-item");
      CheckVisibility(albumsContainerRef, ".artistpage-item");
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [albums, related]);

  return (
    <>
      {artist && tracks && related && (
        <>
          <ArtistBanner avatarSrc={artist?.images[0].url} name={artist?.name} />
          <div className="space-y-4">
            <h2 className="text-xl font-bold px-8 text-white">Top tracks</h2>
            <div className="text-white px-8 flex flex-col space-y-1 pb-6">
              {tracks.slice(0, 5).map((track) => (
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
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold px-8 text-white">Albums</h2>
            <div className="flex gap-4 pl-8" ref={albumsContainerRef}>
              {albums.map((album) => (
                <div className="artistpage-item">
                  <AlbumCard
                    key={album.id}
                    id={album.id}
                    imgSrc={album?.images[0]?.url}
                    title={album.name}
                    artists={album.artists}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold px-8 text-white mt-4">
              Related artists
            </h2>
            <div className="flex gap-4 pl-8" ref={artistsContainerRef}>
              {related.slice(0, 8).map((artist) => (
                <div className="artistpage-item">
                  <ArtistCard
                    key={artist.id}
                    id={artist.id}
                    imgSrc={artist?.images[0]?.url}
                    name={artist.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
