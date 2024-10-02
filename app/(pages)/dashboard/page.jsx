"use client";

import AlbumContainer from "@/components/Global/AlbumContainer";
import AlbumCard from "@/components/Global/AlbumCard";
import PlaylistCard from "@/components/Global/PlaylistCard";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

import { BrowseFetch } from "@/utils/Fetch";
import { CheckVisibility } from "@/utils/Helpers";

export default function DashboardPage() {
  const { data: session } = useSession();

  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [featuredTitle, setFeaturedTitle] = useState("");
  const [newAlbums, setNewAlbums] = useState([]);

  const playlistsContainerRef = useRef(null);
  const albumsContainerRef = useRef(null);

  useEffect(() => {
    async function getFeaturedPlaylists() {
      if (session) {
        const playlists = await BrowseFetch("featured-playlists", session);
        const newReleases = await BrowseFetch("new-releases", session);
        setNewAlbums(newReleases?.albums.items);
        setFeaturedPlaylists(playlists?.playlists.items);
        setFeaturedTitle(playlists?.message);
      }
    }
    getFeaturedPlaylists();
  }, [session]);

  useEffect(() => {
    const handleResize = () => {
      CheckVisibility(playlistsContainerRef);
      CheckVisibility(albumsContainerRef);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [AlbumContainer, featuredPlaylists]);

  return (
    <>
      {featuredPlaylists && featuredPlaylists.length > 0 ? (
        <>
          <AlbumContainer title={featuredTitle}>
            <ul className="playlists-row" ref={playlistsContainerRef}>
              {featuredPlaylists.map((playlist) => (
                <li key={playlist.id} className="playlist-item mx-5">
                  <PlaylistCard
                    imgSrc={playlist.images[0].url}
                    title={playlist.name}
                    owner={playlist.owner.display_name}
                    id={playlist.id}
                  />
                </li>
              ))}
            </ul>
          </AlbumContainer>
          <AlbumContainer title={`New Releases`}>
            <ul className="playlists-row" ref={albumsContainerRef}>
              {newAlbums.map((album) => (
                <li key={album.id} className="playlist-item mx-5">
                  <AlbumCard
                    imgSrc={album.images[0].url}
                    title={album.name}
                    desc={album.artists[0].name}
                    artists={album.artists}
                    id={album.id}
                  />
                </li>
              ))}
            </ul>
          </AlbumContainer>
        </>
      ) : (
        <div>No playlists found</div>
      )}
    </>
  );
}
