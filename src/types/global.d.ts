export {};

declare global {
	interface Account {
		key: string;
		address: string;
		privateKey: string;
		username: string;
		balance: number;
	}

	type AccountUpdateParams = Partial<
		Omit<Account, "key" | "address" | "privateKey">
	>;

	type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
	type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
}

// declare module "deta/dist/types/base" {
// 	interface Base {
// 		putMany(items: Account[], options?: PutManyOptions): Promise<PutManyResponse>;
// 	}
// }
