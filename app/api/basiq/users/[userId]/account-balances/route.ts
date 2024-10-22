import { NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from '@/lib/basiq-auth';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const token = await getToken();
    const response = await axios.get(`https://au-api.basiq.io/users/${params.userId}/accounts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'basiq-version': '3.0'
      }
    });

    // Extract relevant account balance information
    const accountBalances = response.data.data.map((account: any) => ({
      id: account.id,
      name: account.name,
      balance: account.balance,
      currency: account.currency,
      accountType: account.class.type,
    }));

    return NextResponse.json({ accountBalances });
  } catch (error) {
    console.error('Error fetching account balances:', error);
    return NextResponse.json(
      { error: 'Failed to fetch account balances' },
      { status: 500 }
    );
  }
}