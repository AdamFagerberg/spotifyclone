import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const scopes = [
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "playlist-read-private",
  "playlist-modify-private",
  "playlist-modify-public",
  "playlist-read-collaborative",
];

const NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: scopes.join(" "),
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.expires_at = account.expires_at;
      }

      if (Date.now() < token.expires_at * 1000) {
        return token;
      }

      if (!token.refresh_token) {
        throw new TypeError("Missing refresh_token");
      }

      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
          }),
        });

        const tokensOrError = await response.json();

        if (!response.ok) {
          throw tokensOrError;
        }

        const newTokens = tokensOrError;

        token.access_token = newTokens.access_token;
        token.expires_at = Math.floor(Date.now() / 1000 + newTokens.expires_in);

        if (newTokens.refresh_token) {
          token.refresh_token = newTokens.refresh_token;
        }

        return token;
      } catch (error) {
        console.error("Error refreshing access_token", error);
        token.error = "RefreshTokenError";
        return token;
      }
    },
    async session({ session, token }) {
      session.accessToken = token.access_token;
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
