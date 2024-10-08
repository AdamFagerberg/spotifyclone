import "./globals.css";

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import { DeviceProvider } from "@/utils/DeviceContext";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <DeviceProvider>
          <SessionProvider session={session}>
            <main>{children}</main>
          </SessionProvider>
        </DeviceProvider>
      </body>
    </html>
  );
}
