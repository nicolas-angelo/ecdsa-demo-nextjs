import * as React from "react";
import useSWR from "swr";
import axios, { type AxiosResponse } from "axios";

export interface WalletCtxProps {
	children: React.ReactNode;
}

export interface AuthHelpers {
	account: Account | undefined;
	isLoading: boolean;
	error: Error | undefined;
	username: string | undefined;
	setUsername: (username: string) => void;
}

const WalletContext = React.createContext<AuthHelpers>({
	account: undefined,
	isLoading: true,
	error: undefined,
	username: undefined,
	setUsername: (username: string) => {},
});

export const useWallet = () => React.useContext(WalletContext);

const fetcher = (...args: any) => fetch(args).then(res => res.json());

export default function WalletProvider({ children }) {
	const [username, setUsername] = React.useState<string>();
	const {
		data: account,
		error,
		isLoading,
	} = useSWR<Account, Error>(
		() => (username ? `/api/accounts?username=${username}` : null),
		fetcher
	);
	return (
		<WalletContext.Provider
			value={{
				account,
				isLoading,
				error,
				username,
				setUsername,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
}
