import Image from "next/image";

export default function ArtistBanner({ avatarSrc, name }) {
  return (
    <div className="flex items-end space-x-7 text-white p-8">
      <Image
        className="rounded-full w-48 h-48 mb-4"
        src={avatarSrc}
        alt={name}
        width={200}
        height={200}
      />
      <div>
        <p className="text-sm font-bold">Artist</p>
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold">
          {name}
        </h1>
      </div>
    </div>
  );
}
