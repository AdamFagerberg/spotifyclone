import Link from "next/link";
import Image from "next/image";

import { CalcTime } from "@/utils/Helpers";
import { PlaySong } from "@/utils/Fetch";
import { useDevice } from "@/utils/DeviceContext";

export default function SearchPageTrack({
  id,
  imgSrc,
  title,
  artists,
  duration,
  session,
  uri,
}) {
  const { currentDeviceId } = useDevice();

  return (
    <div
      key={id}
      className="cursor-default w-full h-16 px-4 rounded-md flex items-center gap-4 hover:bg-spotifyGray"
      onDoubleClick={() => PlaySong(session, uri, currentDeviceId)}
    >
      <Image
        src={imgSrc}
        alt={title}
        height={40}
        width={40}
        className="rounded-md w-10 h-10"
      />
      <div>
        <p>{title}</p>
        {artists?.map((artist, index) => (
          <Link
            href={`/artist/${artist.id}`}
            className="text-sm text-spotifyLGray hover:underline"
          >
            {index > 0 && ", "}
            {artist.name}
          </Link>
        ))}
      </div>
      <div className="flex-grow flex items-center justify-end">
        <p className="text-sm text-spotifyLGray">{CalcTime(duration)}</p>
      </div>
    </div>
  );
}
