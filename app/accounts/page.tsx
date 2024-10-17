"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountBalance {
  id: string;
  name: string;
  balance: number;
  currency: string;
  accountType: string;
}

export default function AccountBalances() {
  const [accountBalances, setAccountBalances] = useState<AccountBalance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountBalances = async () => {
      try {
        const response = await fetch('/api/basiq/users/6cf03348-7603-4165-a396-5ace94a77959/account-balances');
        if (!response.ok) {
          throw new Error('Failed to fetch account balances');
        }
        const data = await response.json();
        setAccountBalances(data.accountBalances);
      } catch (err) {
        setError('Error fetching account balances');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountBalances();
  }, []);

  if (loading) return <div className="flex-1 space-y-4 p-8 pt-6">Loading account balances...</div>;
  if (error) return <div className="flex-1 space-y-4 p-8 pt-6">Error: {error}</div>;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Account Balances</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accountBalances.map((account) => (
          <Card key={account.id}>
            <CardHeader>
              <CardTitle>{account.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Balance: {account.balance} {account.currency}</p>
              <p>Type: {account.accountType}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}