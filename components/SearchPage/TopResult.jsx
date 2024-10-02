import { FaPlay } from "react-icons/fa6";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function TopResult({ imgSrc, title, owner, id }) {
  const router = useRouter();

  function handleRedirect() {
    router.push(`/playlist/${id}`);
  }

  return (
    <div
      className="cursor-pointer relative group h-64 w-full bg-spotifyXLBlack hover:bg-spotifyGray p-4 flex flex-col gap-6 rounded-md transition duration-500"
      onClick={() => handleRedirect()}
    >
      <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 shadow-2xl shadow-spotifyLBlack z-10 h-12 w-12 flex items-center justify-center rounded-full bg-spotifyGreen bottom-6 group-hover:bottom-8 right-8">
        <FaPlay className="h-6 w-6 text-spotifyBlack" />
      </div>

      <Image
        src={imgSrc}
        alt={title}
        width={112}
        height={112}
        className="h-28 w-28 rounded-md"
      />

      <div>
        <p className="text-3xl font-bold sm:mb-4">{title}</p>
        <div>
          <p className="text-sm text-spotifyLGray">
            By {owner}
            <span className="rounded-full bg-spotiftLBlack text-white font-bold ml-4 py-1 px-4">
              Playlist
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
