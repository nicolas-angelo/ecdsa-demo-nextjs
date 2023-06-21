// import { getServerSession } from "next-auth/next";
import Providers from "./providers";
// import { authOptions } from "app/pages/api/auth/[...nextauth]";
import "app/app/global.css";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const session = await getServerSession(authOptions);

	return (
		<html lang="en" className="dark">
			<Providers>
				<body className="h-screen bg-neutral-200 dark:bg-neutral-800">
					{children}
				</body>
			</Providers>
		</html>
	);
}
