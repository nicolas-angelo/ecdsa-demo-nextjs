"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { type Session } from "next-auth";
import { Card, LabeledInput, ConnectWallet } from "app/components";

import { FaEthereum } from "react-icons/fa";

const walletSchema = {
	label: "Address",
	name: "address",
};

export default function Wallet({ session }: { session?: Session }) {
	const router = useRouter();
	const { data, status, update } = useSession();

	const handleSubmit = async (evt: React.FormEvent) => {
		evt.preventDefault();
		// createAccount(name);
	};

	let s = session || data;

	if (s) {
		return (
			<Card className="dark:bg-slate-700">
				<p className="text-xl font-medium">Signed in as {s.user.username}</p>
				{/* <div className="balance">Balance: {account?.balance}</div> */}
				<Card.Form submitCta="Transfer" onSubmit={handleSubmit}>
					<LabeledInput
						className="ring dark:ring-slate-500"
						{...walletSchema}
						value={s.user.address}
						onChange={evt => {}}
						icon={
							<FaEthereum className="h-5 w-5 text-indigo-400" aria-hidden="true" />
						}
					/>

					<Card.ActionStack
						containerProps="mt-6"
						items={[
							{ label: "Faucet", onClick: () => {} },
							{ label: "Send", onClick: () => {} },
							{
								label: "Sign Out",
								onClick: async () => {
									await signOut({ redirect: false });
									router.refresh();
								},
							},
						]}
					/>
				</Card.Form>
			</Card>
		);
	}

	return <p>not authed</p>;
}
