"use client";

import SidePlaylist from "./SidePlaylist";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { PlaylistFetch } from "@/utils/Fetch";

export default function SideBar() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function getPlaylists() {
      if (session) {
        const playlists = await PlaylistFetch(session);
        setPlaylists(playlists?.items);
      }
    }
    getPlaylists();
  }, [session]);

  return (
    <div className="sidebar text-white bg-spotifyLBlack min-h-[100%] p-2 rounded-md">
      {playlists && playlists.length > 0 ? (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <SidePlaylist
                imgSrc={playlist.images[0].url}
                title={playlist.name}
                type={playlist.type}
                owner={playlist.owner.display_name}
                path={playlist.id}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No playlists found</p>
      )}
    </div>
  );
}
