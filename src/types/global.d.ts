export {};

declare global {

	interface ChildrenAndClassesProps {
		children: React.ReactNode
		className?: string
	}
	
	interface Account {
		key: string;
		address: string;
		privateKey: string;
		username: string;
		balance: number;
		verified: boolean;
	}

	type AccountUpdateParams = Partial<
		Omit<Account, "key" | "address" | "privateKey" | "verified">
	>;

	type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
	type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
}

// declare module "deta/dist/types/base" {
// 	interface Base {
// 		putMany(items: Account[], options?: PutManyOptions): Promise<PutManyResponse>;
// 	}
// }
