"use client";

export default function AlbumContainer({ children, title }) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="ml-6 mt-4 text-3xl font-semibold text-white">{title}</h1>
      </div>
      {children}
    </div>
  );
}
