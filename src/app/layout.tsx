import "app/app/global.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="h-screen flex flex-wrap">{children}</body>
		</html>
	);
}
