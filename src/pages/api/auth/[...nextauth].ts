import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			id: "ethereum",
			name: "Ethereum Username",
			credentials: {
				username: { label: "Username", placeholder: "nicolas.eth" },
			},
			async authorize(credentials, _) {
				const response = await fetch(
					`/api/accounts?username=${credentials.username}`
				);
				if (!response.ok) return null;
				return (await response.json()) ?? null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account, trigger }) {
			if (trigger === "signIn" || trigger === "signUp") {
				console.log({ account, token, user, trigger });
			}
			return token;
		},
		async session({ session, user }) {
			if (user) {
				session.address = user.address;
				session.username = user.username;
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/",
	},
	secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
