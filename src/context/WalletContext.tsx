import * as React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { type Session } from "next-auth";
import { signIn, createAccount } from "app/lib/auth";

type Props = { children: React.ReactNode };
enum WalletAuthAction {
	Unlock = "unlock",
	Generate = "generate",
}

type WalletError = { msg: string; type: WalletAuthAction };

export interface WalletContext {
	account: Account | undefined;
	session: Session | null;
	isLoading: boolean;
	error: WalletError | undefined;
	unlock: (username: string) => Promise<void>;
	generate: (username: string) => void;
}

const WalletContext = React.createContext<WalletContext>({
	account: undefined,
	session: null,
	isLoading: true,
	error: undefined,
	unlock: async (_: string) => {},
	generate: (_: string) => {},
});

export const useWallet = () => React.useContext(WalletContext);

function WalletProvider({ children }: Props) {
	const { data: session, status } = useSession();
	const [account, setAccount] = React.useState<Account>();
	const [error, setError] = React.useState<WalletError>();

	return (
		<WalletContext.Provider
			value={{
				account,
				session,
				isLoading: status === "loading",
				error,
				generate: createAccount,
				unlock: signIn,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
}

export default WalletProvider;

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
