import Image from "next/image";

import { FaPlay } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function ArtistCard({ id, imgSrc, name }) {
  const router = useRouter();

  function handleRedirect() {
    router.push(`/artist/${id}`);
  }

  return (
    <div
      key={id}
      className="cursor-pointer relative group w-56 mb-2 bg-spotifyXLBlack hover:bg-spotifyGray rounded-md p-4"
      onClick={() => handleRedirect()}
    >
      <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 shadow-2xl shadow-spotifyXLBlack z-10 h-12 w-12 flex items-center justify-center rounded-full bg-spotifyGreen top-[156px] group-hover:top-[148px] right-6 ">
        <FaPlay className="h-6 w-6 text-spotifyBlack" />
      </div>

      <Image
        className="rounded-full w-48 h-48 mb-4"
        src={imgSrc}
        alt={name}
        width={200}
        height={200}
      />
      <p className="text-base text-white mb-1 w-48 truncate">{name}</p>

      <p className="text-sm text-neutral-400 mb-8 w-48 truncate">Artist</p>
    </div>
  );
}
