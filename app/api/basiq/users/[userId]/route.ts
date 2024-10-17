import { NextResponse } from 'next/server';
import axios from 'axios';
import { getToken } from '@/lib/basiq-auth';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const token = await getToken();
    const response = await axios.get(`https://au-api.basiq.io/users/${params.userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'basiq-version': '3.0'
      }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const token = await getToken();
    await axios.delete(`https://au-api.basiq.io/users/${params.userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'basiq-version': '2.0'
      }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
  }
}