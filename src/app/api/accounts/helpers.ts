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
	verified: true,
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
		let user = await this.db.fetch({ username, key: username });
		console.log("png", user);
		if (user.items[0]) {
			return user.items[0];
		} else {
			console.log("creating account");
			return {};
			// let pk = generatePrivateKey();
			// let account = generateAccount({ pk, username });
			// try {
			// 	let r = await this.db.insert(account, username);
			// 	return r;
			// } catch (err) {
			// 	console.log(err);
			// 	return new Error(err);
			// }
		}
	}

	async getAccount(address: string) {
		let user = await this.db.get(address);
		return user;
	}

	async searchAccount(username: string) {
		let user = await this.db.fetch({ username, verified: true });
		return user.items[0] ? user.items[0] : undefined;
	}

	async updateAccount<T = AccountUpdateParams>(
		username: string,
		payload: T,
		s = 200
	) {
		return await this.db.update<T>(payload, username, expIn(s));
	}

	async deleteAccount(username: string) {
		return await this.db.delete(username);
	}
}
