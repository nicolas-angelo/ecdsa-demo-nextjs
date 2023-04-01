import { promises as fs } from 'fs';
import path from 'path';

type BalanceSheet = Record<string, number>;
interface BalanceHelpers {
  getAll: () => BalanceSheet;
  getByAddress: (address: string) => number;
  delete: (address: string) => Promise<void>;
}

export default class DB {
  private balancesData: BalanceSheet;
  constructor() {
    this.balancesData = require(this.getPath('balances'));
  }

  getPath(collection: string) {
    return path.resolve(__dirname, 'data', `${collection}.json`);
  }

  async writeData<T>(collection: string, data: T) {
    return await fs.writeFile(this.getPath(collection), JSON.stringify(data));
  }

  balances: BalanceHelpers = {
    getAll: () => this.balancesData,
    getByAddress: (address: string) => this.balancesData[address],
    delete: async (address: string) => {
      delete this.balancesData[address];
      await this.writeData<BalanceSheet>('balances', this.balancesData);
    },
  };
}
