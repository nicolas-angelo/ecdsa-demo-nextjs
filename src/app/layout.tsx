import Providers from "./providers";
import "app/app/global.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<Providers>
				<body className="h-screen bg-neutral-700">{children}</body>
			</Providers>
		</html>
	);
}
