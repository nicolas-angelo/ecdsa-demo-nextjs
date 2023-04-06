"use client";
import { SessionProvider } from "next-auth/react";
import WalletProvider from "app/context/WalletContext";

const Providers = ({ children }: {
	children: React.ReactNode
}) => {
	return (
		<SessionProvider refetchInterval={10}>
			<WalletProvider>{children}</WalletProvider>
		</SessionProvider>
	);
};

export default Providers;
