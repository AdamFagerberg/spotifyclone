export async function TrackFetch(type, id, session) {
  if (session?.accessToken) {
    const res = await fetch(`https://api.spotify.com/v1/${type}/${id}/tracks`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  }
  return null;
}

export async function BrowseFetch(type, session) {
  if (session?.accessToken) {
    const res = await fetch(`https://api.spotify.com/v1/browse/${type}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  }
  return null;
}

export async function PlaylistFetch(session) {
  if (session?.accessToken) {
    const res = await fetch(`https://api.spotify.com/v1/me/playlists`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  }
  return null;
}

export async function SearchFetch(session, query) {
  if (session?.accessToken) {
    const res = await fetch(
      "https://api.spotify.com/v1/search?" +
        new URLSearchParams({
          q: query,
          type: ["artist", "playlist", "track"],
        }),
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await res.json();
    return data;
  }
  return null;
}

export async function PlaySong(session, track, currentDeviceId) {
  if (session?.accessToken) {
    const res = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${currentDeviceId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [track],
          position_ms: 0,
        }),
      }
    );
  }
}

export async function PlayAlbumSong(session, pos, albumId, currentDeviceId) {
  if (session?.accessToken) {
    const res = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${currentDeviceId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context_uri: `spotify:album:${albumId}`,
          offset: {
            position: pos - 1,
          },
          position_ms: 0,
        }),
      }
    );

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error(`Error: ${res.status} - ${errorMessage}`);
    }
  }
}

export async function PlayPlaylistSong(
  session,
  pos,
  playlistId,
  currentDeviceId
) {
  if (session?.accessToken) {
    const res = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${currentDeviceId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          context_uri: `spotify:playlist:${playlistId}`,
          offset: {
            position: pos - 1,
          },
          position_ms: 0,
        }),
      }
    );

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error(`Error: ${res.status} - ${errorMessage}`);
    }
  }
}
