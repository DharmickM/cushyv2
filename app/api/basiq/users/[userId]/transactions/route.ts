import { NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from '@/lib/basiq-auth';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const token = await getToken();
    const response = await axios.get(`https://au-api.basiq.io/users/${params.userId}/transactions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'basiq-version': '3.0'
      }
    });

    // Extract and format the relevant transaction data
    const transactions = response.data.data.map((transaction: any) => ({
      id: transaction.id,
      amount: transaction.amount,
      direction: transaction.direction,
      status: transaction.status,
      description: transaction.description,
      postDate: transaction.postDate,
      institution: transaction.institution.shortName,
      category: transaction.category,
    }));

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ message: 'Failed to fetch transactions' }, { status: 500 });
  }
}