import { Deta } from "deta";
import { TypedBase } from "deta/dist/types/base";
import { PKPair, generatePrivateKey, generateAddress } from "app/lib/crypto";

export const deta = Deta(process.env.DETA_PROJECT_KEY);

const expIn = (expireIn = 300) => ({ expireIn });

const generateAccount = ({
	pk,
	username,
}: {
	pk: PKPair;
	username: string;
}): Account => ({
	key: generateAddress(pk.pk),
	address: generateAddress(pk.pk),
	privateKey: pk.hex,
	username,
	balance: 0,
});

export default class AccountClient {
	private db: TypedBase<Account>;
	constructor(collection = "alchemy") {
		this.db = deta.Base(collection) as unknown as TypedBase<Account>;
	}

	async getAllAccounts() {
		return this.db as unknown as Account[];
	}

	async createBulkAccounts(s = 500) {
		let records = ["michael.eth", "alex.eth"].map(username =>
			generateAccount({ pk: generatePrivateKey(), username })
		);
		return await this.db.putMany(records, expIn(s));
	}

	async createAccount(username: string, s = 200) {
		let pk = generatePrivateKey();
		let account = generateAccount({ pk, username });
		return await this.db.put(account, account.address, expIn(s));
	}

	async findAccount(username: string) {
		return await this.db.fetch({ username });
	}

	async getAccount(address: string) {
		return await this.db.get(address);
	}

	async updateAccount<T = AccountUpdateParams>(
		address: string,
		payload: T,
		s = 200
	) {
		return await this.db.update<T>(payload, address, expIn(s));
	}

	async deleteAccount(address: string) {
		return await this.db.delete(address);
	}
}
