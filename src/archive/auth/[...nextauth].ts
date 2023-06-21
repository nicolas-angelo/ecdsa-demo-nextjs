import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LIVE_URL } from "app/constants";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "ethereum",
			name: "Ethereum",
			credentials: {
				username: { label: "Username", type: "text", placeholder: "nicolas.eth" },
			},
			async authorize(credentials, _) {
				const response = await fetch(
					LIVE_URL.concat(`/api/accounts?username=${credentials?.username}`)
				);
				if (!response.ok) return null;
				return (await response.json()) ?? null;
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			console.log("pinging session");
			session.user = token.user;
			session.address = token.address;
			session.username = token.username;
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.address = user.address;
				token.username === user.username;
				token.user = user;
			}
			return token;
		},
	},
	session: {
		strategy: "jwt",
	},
	// jwt: {
	// 	maxAge: 60 * 60 * 24 * 30,
	// },
	pages: {
		signIn: "/",
		error: "/", // Error code passed in query string as ?error=
	},
	secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
