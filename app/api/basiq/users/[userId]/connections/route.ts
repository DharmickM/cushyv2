import { NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from '@/lib/basiq-auth';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const token = await getToken();
    const response = await axios.get(`https://au-api.basiq.io/users/${params.userId}/connections`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'basiq-version': '3.0'
      }
    });

    // Extract and format the relevant connection data
    const connections = response.data.data.map((connection: any) => ({
      id: connection.id,
      status: connection.status,
      lastUsed: connection.lastUsed,
      institution: {
        id: connection.institution.id,
        name: connection.institution.name,
        logo: connection.institution.logo,
      },
    }));

    return NextResponse.json({ connections });
  } catch (error) {
    console.error('Error fetching connections:', error);
    return NextResponse.json({ message: 'Failed to fetch connections' }, { status: 500 });
  }
}