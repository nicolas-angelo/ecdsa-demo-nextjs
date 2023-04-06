import { getServerSession } from "next-auth/next";
import { ConnectWallet, Wallet, FAW, WalletGuard } from "app/components";
import Providers from "./providers";
import { authOptions } from "app/pages/api/auth/[...nextauth]";
import "app/app/global.css";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return (
		<html lang="en" className="dark">
			<Providers>
				<body className="h-screen bg-neutral-200 dark:bg-neutral-800">
					<p>{JSON.stringify(session, null, 2)}</p>
					{children}
					{/* floating action widget */}
					<FAW buttonProps={{ imageSrc: "/images/fox.png" }}>
						{session ? (
							<Wallet session={session} />
						) : (
							<WalletGuard
								fallback={<ConnectWallet isLoading />}
								onUnauthorized={<ConnectWallet />}
							>
								<Wallet />
							</WalletGuard>
						)}
					</FAW>
				</body>
			</Providers>
		</html>
	);
}
