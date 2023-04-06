import { Deta } from "deta";
import { TypedBase } from "deta/dist/types/base";
import { PKPair, generatePrivateKey, generateAddress } from "app/lib/crypto";

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

const deta = Deta(process.env.DETA_PROJECT_KEY);
const accounts = deta.Base("alchemy") as unknown as TypedBase<Account>;

export const getAllAccounts = async () => {
  return accounts as unknown as Account[];
}

export const createBulkAccounts = async(s = 500) => {
  let records = ["michael.eth", "alex.eth"].map(username =>
    generateAccount({ pk: generatePrivateKey(), username })
  );
  return await accounts.putMany(records, expIn(s));
}

export const getAccount = async(address: string) => {
  let user = await accounts.get(address);
  return user;
}

export const createAccount = async(username: string, s = 200) => {
    let pk = generatePrivateKey();
    let account = generateAccount({ pk, username });
    return await accounts.insert(account, username);
}

export const searchAccount = async(username: string) => {
  let user = await accounts.fetch({ username, key: username, verified: true });
  return user.items[0] ? user.items[0] : undefined;
}

export const updateAccount = async <T = AccountUpdateParams>(
		username: string,
		payload: T,
		s = 200
	) => {
		return await accounts.update<T>(payload, username, expIn(s));
	}

export const deleteAccount = async(username: string) => {
  return await accounts.delete(username);
}

export default deta;
