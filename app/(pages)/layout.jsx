import SideBar from "@/components/Sidebar/SideBar";
import NavBar from "@/components/Navbar/NavBar";
import MusicPlayer from "@/components/Player/MusicPlayer";

export const metadata = {
  title: "Spotify Dashboard",
  description: "Spotify Dashboard",
};

export default async function RootLayout({ children }) {
  return (
    <div className="dashboardContainer min-h-screen bg-spotifyBlack gap-2">
      <NavBar />
      <SideBar />
      <div className="content bg-spotifyLBlack rounded-md overflow-hidden p-5">
        {children}
      </div>
      <MusicPlayer />
    </div>
  );
}
