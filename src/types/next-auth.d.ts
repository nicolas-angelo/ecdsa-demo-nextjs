import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface User extends Account {}
	interface Session {
		user: Account;
		address: Account["address"];
		username: Account["username"];
	}
}

// declare module "next-auth/jwt" {
// 	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
// 	interface JWT {
// 		/** OpenID ID Token */
// 		idToken?: string;
// 	}
// }
