// 'use client';

export const revalidate = 0;

export default async function Home() {
  const res = await fetch(
    `https://nextjsnt3nzw-w151--3000.local-credentialless.webcontainer.io/api/balances`,
    {
      cache: 'no-cache',
    }
  );

  const getBalances = async () => {
    try {
      const res = await fetch(`/api/balances`, {
        cache: 'no-cache',
      });
      console.log(res.json());
    } catch (err) {
      console.log(err);
    }
  };

  const balances = await res.json();

  return (
    <div>
      <p>balance: {JSON.stringify(balances)}</p>
      <button onClick={getBalances}>Get balance</button>
    </div>
  );
}
