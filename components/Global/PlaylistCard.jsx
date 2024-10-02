import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function PlaylistCard({ id, imgSrc, title, owner }) {
  const router = useRouter();

  function handleRedirect() {
    router.push(`/playlist/${id}`);
  }

  return (
    <div
      key={id}
      className="cursor-pointer relative group w-56 mb-2 bg-spotifyXLBlack hover:bg-spotifyGray rounded-md p-4"
      onClick={() => handleRedirect()}
    >
      <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-500 shadow-2xl shadow-spotifyBlack z-10 h-12 w-12 flex items-center justify-center rounded-full bg-spotifyGreen top-[156px] group-hover:top-[148px] right-6">
        <FaPlay className="h-6 w-6 text-spotifyBlack" />
      </div>
      <Image
        src={imgSrc}
        alt={title}
        width={200}
        height={200}
        className="rounded-md mb-4 w-48 h-48"
      />
      <p className="text-base text-white mb-1 w-48 truncate">{title}</p>
      <p className="text-sm text-spotifyLGray mb-8 w-48 truncate">By {owner}</p>
    </div>
  );
}
