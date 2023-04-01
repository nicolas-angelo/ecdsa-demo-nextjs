import "app/app/global.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="flex h-screen flex-wrap">{children}</body>
		</html>
	);
}
