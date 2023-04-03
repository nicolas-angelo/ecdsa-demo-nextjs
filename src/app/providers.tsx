"use client";
import { SessionProvider } from "next-auth/react";
import WalletProvider from "app/context/WalletContext";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<WalletProvider>{children}</WalletProvider>
		</SessionProvider>
	);
}
