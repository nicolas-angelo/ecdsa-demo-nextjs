"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { LabeledInput } from "app/components";
// import { useWallet } from "app/context/WalletContext";

const WALLET_FORM_SCHEMA = {
	address: {
		label: "Address",
		name: "address",
		placeholder: "0x1",
	},
};

export default function Wallet() {
	const [name, setName] = React.useState("");
	// const { account, error, isLoading, createAccount } = useWallet();
	const searchParams = useSearchParams();

	const handleSubmit = async (evt: React.FormEvent) => {
		evt.preventDefault();

		const signInResult = await signIn("ethereum", {
			username: name,
			redirect: false,
			callbackUrl: searchParams?.get("from") || "/dashboard",
		});

		if (!signInResult?.ok) {
			console.log("signInResult: ", signInResult);
			return;
		}

		// createAccount(name);
	};

	// if (error) {
	// 	return <div>Failed to load</div>;
	// }

	return (
		<div className="w-full sm:max-w-md">
			<div className="rounded-lg bg-neutral-700 px-4 py-8 text-gray-200 shadow-lg shadow-black sm:px-10">
				{/* <div className="balance">Balance: {account?.balance}</div> */}
				<form id="wallet" className="space-y-6" onSubmit={handleSubmit}>
					<LabeledInput
						{...WALLET_FORM_SCHEMA["address"]}
						value={name}
						onChange={evt => setName(evt.target.value)}
					/>
					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-neutral-600" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-neutral-700 px-2 text-neutral-200">
									Or continue with
								</span>
							</div>
						</div>

						{/* <div className="mt-6 grid grid-cols-3 gap-3">
							<LabeledInput
								{...WALLET_FORM_SCHEMA["address"]}
								value={currentAddress}
								onChange={onChange}
							/>
							<LabeledInput
								{...WALLET_FORM_SCHEMA["address"]}
								value={currentAddress}
								onChange={onChange}
							/>
						</div> */}
					</div>
					<div>
						<button type="submit" className="w-full">
							SIGN IN
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
