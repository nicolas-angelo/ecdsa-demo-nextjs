"use client";
import { LabeledInput } from "app/components";
import { useWallet } from "app/context/WalletContext";
import React from "react";

const WALLET_FORM_SCHEMA = {
	address: {
		label: "Address",
		name: "address",
		placeholder: "0x1",
	},
};

const onChange =
	<T,>(setter: SetState<T>) =>
	(evt: InputChangeEvent) =>
		setter(evt.target.value as unknown as T);

export default function Wallet() {
	const [name, setName] = React.useState("");
	const { account, username, setUsername, error, isLoading } = useWallet();

	const handleSubmit = (evt: React.FormEvent) => {
		evt.preventDefault();
		setUsername(name);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Failed to load</div>;
	}

	return (
		<div className="w-full sm:max-w-md">
			<div className="rounded-lg bg-neutral-700 px-4 py-8 text-gray-200 shadow-lg shadow-black sm:px-10">
				<div className="balance">Balance: {account?.balance}</div>
				<form id="wallet" className="space-y-6" onSubmit={handleSubmit}>
					<LabeledInput
						{...WALLET_FORM_SCHEMA["address"]}
						value={name}
						onChange={onChange(setName)}
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
