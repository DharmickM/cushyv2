import { NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from '@/lib/basiq-auth';

export async function GET(
  request: Request,
  { params }: { params: { userId: string; transactionId: string } }
) {
  try {
    const token = await getToken();
    const response = await axios.get(`https://au-api.basiq.io/users/${params.userId}/transactions/${params.transactionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'basiq-version': '3.0'
      }
    });

    // Extract and format the relevant transaction data
    const transaction = {
      id: response.data.id,
      amount: response.data.amount,
      direction: response.data.direction,
      status: response.data.status,
      description: response.data.description,
      postDate: response.data.postDate,
      institution: response.data.institution.shortName,
      category: response.data.category,
    };

    return NextResponse.json({ transaction });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    return NextResponse.json({ message: 'Failed to fetch transaction' }, { status: 500 });
  }
}