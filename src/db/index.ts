import { promises as fs } from "fs";
import path from "path";

type BalanceSheet = Record<string, number>;

interface BalanceHelpers {
	getAll: () => BalanceSheet;
	getByAddress: (address: string) => number;
	delete: (address: string) => Promise<void>;
}


interface DBData {
  balances: BalanceSheet;
}

export default class DB {
  private data!: DBData;
	constructor() {
		this.data = {
      balances: require('app/db/data/balances.json') as BalanceSheet,
    };
	}

  async writeData<T>(collection: string, data: T) {
    let root = path.join(process.cwd(), "src")
    const filePath = path.join(root, "db", "data", `${collection}.json`);
    return await fs.writeFile(filePath, JSON.stringify(data));
  }


  get balances(): BalanceHelpers  {
    const balanceSheet = { ...this.data.balances };

   return {
      getAll: () => balanceSheet,
      getByAddress: (address: string) => balanceSheet[address],
      delete: async (address: string) => {
        delete balanceSheet[address];
        await this.writeData<BalanceSheet>("balances", balanceSheet);
      },
    };
  }
}
