import { NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from '@/lib/basiq-auth';

export async function POST(request: Request) {
  const { email, mobile } = await request.json();

  try {
    const token = await getToken();
    const response = await axios.post('https://au-api.basiq.io/users', {
      email,
      mobile
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'basiq-version': '3.0'
      }
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
  }
}