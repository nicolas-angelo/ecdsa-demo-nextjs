"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, LabeledInput } from "app/components";
import { useWallet } from "app/context/WalletContext";
import { EnsIcon } from "app/components/icons";

enum FormType {
	Unlock = "unlock",
	Generate = "generate",
}

export default function ConnectWallet({ isLoading }: { isLoading?: boolean }) {
	const { unlock, generate } = useWallet();
	const router = useRouter();
	const [view, setView] = React.useState<FormType>(FormType.Generate);
	const toggleView = () =>
		setView(view === "unlock" ? FormType.Generate : FormType.Unlock);

	const handleSubmit = async (evt: React.FormEvent) => {
		evt.preventDefault();
		const formData = new FormData(evt.currentTarget as HTMLFormElement);
		const username = formData.get("username");
		view === FormType.Unlock
			? await unlock(username as string)
			: generate(username as string, {
					onError: err => console.error(err),
			  });
		router.refresh();
	};

	const generateForm = (type: FormType) => (
		<Form key={type} type={type} handleSubmit={handleSubmit} />
	);

	if (isLoading) return <WalletLoading />;

	return (
		<Card className="flex-1 bg-transparent dark:bg-transparent">
			<Card.Header img="/images/fox.png" title="MicroMask" />
			{generateForm(view)}
			<div className="mt-6 flex flex-col justify-between space-y-6">
				<Card.Divider
					label={
						view === FormType.Generate
							? "Or Unlock Existing Wallet"
							: "Or Create A New Wallet"
					}
				/>
				<Card.Button
					label={view === FormType.Generate ? "Unlock" : "Create A Wallet"}
					onClick={toggleView}
				/>
			</div>
		</Card>
	);
}

const Form = ({
	type,
	handleSubmit,
}: {
	type: FormType;
	handleSubmit: (evt: React.FormEvent) => void;
}) => {
	const [username, setUsername] = React.useState("");
	const inputRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<Card.Form
			className="flex flex-1 flex-col justify-between"
			submitCta={type === FormType.Unlock ? "Unlock" : "Generate"}
			onSubmit={handleSubmit}
		>
			<div className="mt-6 flex flex-col space-y-3">
				<LabeledInput
					label="Username"
					className="ring dark:ring-slate-500"
					name="username"
					placeholder="nicolas.eth"
					value={username}
					onChange={evt => setUsername(evt.target.value)}
					icon={<EnsIcon className="h-5 w-5" aria-hidden="true" />}
					ref={inputRef}
					required
				/>
			</div>
		</Card.Form>
	);
};

export const WalletLoading = () => (
	<Card className="flex-1 animate-pulse bg-transparent dark:bg-transparent">
		<Card.Header img="/images/fox.png" title="MicroMask" />
		<div className="flex flex-1 flex-col justify-between space-y-6">
			<div className="mt-6 flex flex-col space-y-3">
				<LabeledInput.Skeleton />
			</div>
			<Card.Button className="text-transparent" label="loading" />
		</div>
		<div className="mt-6 flex flex-col justify-between space-y-6">
			<Card.Divider />
			<Card.Button className="text-transparent" label="loading" />
		</div>
	</Card>
);
