"use client";
import axios from "axios"

// export const revalidate = 0

// async function getBalances() {
// 			const res = await axios.get(`https://nicolas-angelo-super-chainsaw-j77w5gpqw5pfq7x-3000.preview.app.github.dev/api/hello`);
// 			console.log(res.data)
// 			return res.data
// }

export default function Home() {
	// const balances = await getBalances()
	const getBalances = async () => {
		try {
			let { data } = await axios.get("./api/balances")
			console.log({ data })
			// const res = await fetch(`/api/balances`, {
			// 	cache: "no-cache",
			// });
			// console.log(await res.json());
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
