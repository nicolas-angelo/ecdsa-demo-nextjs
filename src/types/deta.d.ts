import { Deta } from "deta";

type GetResponse<T> = T | null | undefined;
type PutResponse<T> = T | null | undefined;
interface PutManyResponse<T> {
	processed: {
		items: T[] | null | undefined;
	};
}
interface FetchResponse<T> {
	items: T[];
	count: number;
	last?: string;
}

declare module "deta/dist/types/base" {
	export interface TypedBase<T> extends Base {
		putMany(items: T[], options?: PutManyOptions): Promise<PutManyResponse<T>>;
		put(data: T, key?: string, options?: PutOptions): Promise<PutResponse<T>>;
		get(key: string): Promise<GetResponse<T>>;
		delete(key: string): Promise<DeleteResponse>;
		insert(data: T, key?: string, options?: InsertOptions): Promise<T>;
		update<TypedUpdateObj>(
			updates: TypedUpdateObj,
			key: string,
			options?: UpdateOptions
		): Promise<UpdateResponse>;
		fetch(query?: CompositeType, options?: FetchOptions): Promise<FetchResponse<T>>;
	}
}

// export class AccountBase extends Omit<Base, "putMany">, BaseWithAccount {}
