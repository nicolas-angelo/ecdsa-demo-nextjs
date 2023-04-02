import "app/app/global.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="h-screen bg-neutral-700">{children}</body>
		</html>
	);
}
