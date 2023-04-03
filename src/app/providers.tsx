"use client";
import { SessionProvider } from "next-auth/react";
import WalletProvider from "app/context/WalletContext";

export default function Providers({ children }) {
	return (
		<SessionProvider>
			<WalletProvider>{children}</WalletProvider>
		</SessionProvider>
	);
}
