"use client";
import { LabeledInput } from "app/components";
import useWallet from "app/hooks/useWallet";
import React from "react";

const WALLET_FORM_SCHEMA = {
	address: {
		label: "Address",
		name: "address",
		placeholder: "0x1",
	},
};

const setValue =
	<T,>(setter: React.Dispatch<React.SetStateAction<T>>) =>
	(evt: React.ChangeEvent<HTMLInputElement>) =>
		setter(evt.target.value as unknown as T);

export default function Wallet() {
	const { balance, fetchBalance, currentAddress, setAddress } = useWallet();

	async function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
		const address = evt.target.value;
		setAddress(address);
		address && fetchBalance(address);
	}
	return (
		<div className="w-full sm:max-w-md">
			<div className="rounded-lg bg-neutral-700 px-4 py-8 text-gray-200 shadow-lg shadow-black sm:px-10">
				<div className="balance">Balance: {balance}</div>
				<form id="auth-sign-in" className="space-y-6">
					<LabeledInput
						{...WALLET_FORM_SCHEMA["address"]}
						value={currentAddress}
						onChange={onChange}
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

						<div className="mt-6 grid grid-cols-3 gap-3">
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
						</div>
					</div>
					<div>
						<button type="submit" className="w-full">SIGN IN</button>
					</div>
				</form>
			</div>
		</div>
	);
}
