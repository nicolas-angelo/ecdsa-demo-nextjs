"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function useWallet() {
	const [balance, setBalance] = useState(0);
	const [address, setAddress] = useState("");

	const fetchBalance = async (address: string) => {
		try {
			let { data } = await axios.get(`./api/balances/${address}`);
			data ? setBalance(data.balance) : setBalance(0);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (address) {
			fetchBalance(address);
		} else {
			setBalance(0);
		}
	}, [address]);

	return {
		balance,
		fetchBalance,
		currentAddress: address,
		setAddress,
	};
}
