"use client";

import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useDevice } from "@/utils/DeviceContext";
import Link from "next/link";

import { CalcTime } from "@/utils/Helpers";

import {
  FaPlay,
  FaPause,
  FaForwardStep,
  FaBackwardStep,
  FaVolumeLow,
} from "react-icons/fa6";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

export default function MusicPlayer() {
  const [session, setSession] = useState(null);
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [player, setPlayer] = useState(undefined);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(20);
  const { setCurrentDeviceId } = useDevice();

  useEffect(() => {
    const fetchSession = async () => {
      const userSession = await getSession();
      setSession(userSession);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (!session?.accessToken) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Spotify?",
        getOAuthToken: (cb) => {
          cb(session.accessToken);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setCurrentDeviceId(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, [session?.accessToken]);

  useEffect(() => {
    let interval;

    if (is_active && !is_paused) {
      interval = setInterval(() => {
        player.getCurrentState().then((state) => {
          if (state) {
            setCurrentTime(state.position);
          }
        });
      }, 1000);
    } else if (is_paused) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [is_active, is_paused, player]);

  const handlePlayPause = () => {
    if (!is_paused) {
      player.pause();
    } else {
      player.resume();
    }
  };

  const handleTimeSlide = (e) => {
    setCurrentTime(e.target.value);
    player.seek(e.target.value);
  };

  const handleVolumeSlide = (e) => {
    setCurrentVolume(e.target.value);
    player.setVolume(e.target.value);
  };

  /*   {current_track.artists[0]?.name} */
  {
    /* <h3 className="text-spotifyLGray overflow-hidden text-ellipsis">
     */
  }
  return (
    <div className="player p-4 bg-spotifyLBlack rounded-md">
      {is_active && current_track ? (
        <>
          <div className="flex gap-5">
            <div>
              <Image
                src={current_track?.album?.images[0]?.url}
                alt={current_track?.album?.name}
                width={100}
                height={100}
                style={{ minWidth: 100 }}
                className="rounded-md"
              />
            </div>
            <div className="self-center whitespace-nowrap overflow-hidden flex flex-col">
              <h2 className="text-white overflow-hidden text-ellipsis">
                {current_track?.name}
              </h2>
              <div className="flex flex-row text-ellipsis overflow-hidden whitespace-nowrap">
                {current_track?.artists?.map((artist, index) => (
                  <h3
                    key={artist.id}
                    className="text-spotifyLGray hover:underline text-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    {index > 0 && ", "}
                    <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
                  </h3>
                ))}
              </div>
            </div>
          </div>

          <div className="text-spotifyLGray flex gap-5 flex-col justify-center text-center mx-5">
            <div className="gap-6 flex justify-center">
              <button
                onClick={() => player.previousTrack()}
                className="hover:text-white"
              >
                <FaBackwardStep />
              </button>
              <button onClick={handlePlayPause} className="hover:text-white">
                {is_paused ? <FaPlay /> : <FaPause />}
              </button>
              <button
                onClick={() => player.nextTrack()}
                className="hover:text-white"
              >
                <FaForwardStep />
              </button>
            </div>
            <div className="flex self-center">
              <p>{CalcTime(currentTime)}</p>
              <input
                className="md:min-w-80 mx-4"
                type="range"
                min={0}
                max={current_track?.duration_ms}
                value={currentTime}
                onChange={(e) => handleTimeSlide(e)}
              />
              <p>{CalcTime(current_track?.duration_ms)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaVolumeLow className="text-spotifyLGray" />
            <input
              className="max-md:max-w-14"
              type="range"
              min={0}
              step={0.01}
              max={1}
              value={currentVolume}
              onChange={(e) => handleVolumeSlide(e)}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <div
              style={{ height: 100, width: 100 }}
              className="bg-spotifyGray rounded-md"
            ></div>
          </div>
          <div className="self-center">
            <h2 className="text-white">Nothing playing on this device</h2>
          </div>
          <div className="text-spotifyLGray col-start-3 flex gap-5 justify-center">
            <button
              onClick={() => player.previousTrack()}
              className="hover:text-white"
            >
              <FaBackwardStep />
            </button>
            <button onClick={handlePlayPause} className="hover:text-white">
              {is_paused ? <FaPlay /> : <FaPause />}
            </button>
            <button
              onClick={() => player.nextTrack()}
              className="hover:text-white"
            >
              <FaForwardStep />
            </button>
          </div>
          <div className="flex items-center gap-2 col-start-4">
            <FaVolumeLow className="text-spotifyLGray" />
            <input
              type="range"
              min={0}
              step={0.01}
              max={1}
              value={currentVolume}
              onChange={(e) => handleVolumeSlide(e)}
            />
          </div>
        </>
      )}
    </div>
  );
}
