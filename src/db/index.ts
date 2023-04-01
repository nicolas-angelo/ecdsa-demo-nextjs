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
    this.init();
	}

  private init() {
    Object.keys(this.data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return this.data[key];
        },
        enumerable: true,
        configurable: true,
      });
    });

    const balanceSheet = { ...this.data.balances };
    this.balances = {
      getAll: () => balanceSheet,
      getByAddress: (address: string) => balanceSheet[address],
      delete: async (address: string) => {
        delete balanceSheet[address];
        await this.writeData<BalanceSheet>("balances", balanceSheet);
      },
    };
	}

  async writeData<T>(collection: string, data: T) {
    const filePath = path.join("app", "db", "data", `${collection}.json`);
    return await fs.writeFile(filePath, JSON.stringify(data));
  }

  balances: BalanceHelpers;


	// balances: BalanceHelpers = {
  //   getAll: () => this.data.balances,
  //   getByAddress: (address: string) => this.data.balances[address],
  //   delete: async (address: string) => {
  //     delete this.data.balances[address];
  //     await this.writeData<BalanceSheet>("balances", this.data.balances);
  //   },
	// };
}
