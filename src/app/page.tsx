import { headers } from 'next/headers';

async function getBalances() {
  // const res = await fetch('/api/balances');
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data');
  // }

  // return res.json();
  return null;
}

export default async function Home() {
  const headersInstance = headers();
  console.log('host:', headersInstance.get('host'));
  // const balances = await getBalances();

  // if (!balances) {
  //   return <div>no balances</div>;
  // }
  return <div>hello</div>;
}
