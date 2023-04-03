// "use client";
import { Wallet } from "app/components";
// import { LIVE_URL } from "app/constants";

// async function getAccounts() {
// 	const res = await fetch(LIVE_URL.concat("/api/accounts"), { cache: "no-store" });
// 	if (!res.ok) {
// 		// This will activate the closest `error.js` Error Boundary
// 		throw new Error("Failed to fetch data");
// 	}

// 	return res.json();
// }

export default async function Home() {
	// const balances = await getAccounts();

	// const session = await fetch("/api/auth/session").then(r => r.json());

	// console.log("session: ", session);
	return (
		<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 ">
			<Wallet />
			{/* {balances ? (
				<div className="flex  justify-center">
					<Wallet />
				</div>
			) : null} */}
		</div>
	);
}
