"use client";

export default function Home() {
	const getBalances = async () => {
		try {
			const res = await fetch(`/api/balances`, {
				cache: "no-cache",
			});
			console.log(res.json());
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<button onClick={getBalances}>Get balance</button>
		</div>
	);
}
