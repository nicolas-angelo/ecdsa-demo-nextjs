import * as React from "react";
import useSWR from "swr";
// import axios, { type AxiosResponse } from "axios";

export interface WalletCtxProps {
	children: React.ReactNode;
}

export interface AuthHelpers {
	account: Account | undefined;
	isLoading: boolean;
	error: Error | undefined;
	username: string;
	setUsername: (username: string) => void;
	createAccount: (username: string) => void;
}

const WalletContext = React.createContext<AuthHelpers>({
	account: undefined,
	isLoading: true,
	error: undefined,
	username: "",
	setUsername: (_: string) => {},
	createAccount: (_: string) => {},
});

export const useWallet = () => React.useContext(WalletContext);

// type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// const fetcher = (...args: any) => fetch(args).then(res => res.json());
// const typedFetch = <P, T>(url: string, body: P, method: HttpMethod): Promise<T> =>
// 	fetch(url, {
// 		method,
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(body),
// 	})
// 		.then(res => {
// 			if (!res.ok) {
// 				throw new Error("Network response was not ok");
// 			}
// 			return res.json() as Promise<T>;
// 		})
// 		.then(data => data)
// 		.catch((err: Error) => {
// 			throw new Error(`Fetch error: ${err.message}`);
// 		});

export default function WalletProvider({ children }) {
	const [username, setUsername] = React.useState<string>("");
	// const {
	// 	data: account,
	// 	error,
	// 	isLoading,
	// 	mutate,
	// } = useSWR<Account, Error>(
	// 	() => (username ? `/api/accounts/${username}` : undefined),
	// 	fetcher,
	// 	{
	// 		refreshInterval: 1000,
	// 		onSuccess: (data, key, config) => console.log("swr data: ", data),
	// 	}
	// );

	function createAccount(username: string) {
		setUsername(username);
		// typedFetch<AccountUpdateParams, Account>("/api/accounts", { username }, "POST")
		// 	.then(data => {
		// 		console.log("data: ", data);
		// 		// mutate(data);
		// 	})
		// 	.catch(err => console.log(err));
	}

	// React.useEffect(() => {
	// 	console.log("your account: ", account);
	// }, [account]);

	return (
		<WalletContext.Provider
			value={{
				account: undefined,
				isLoading: true,
				error: undefined,
				username,
				setUsername,
				createAccount,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
}
