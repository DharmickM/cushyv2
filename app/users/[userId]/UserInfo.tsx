'use client';

import { use } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function fetchUserInfo(userId: string) {
  const res = await fetch(`/api/basiq/users/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

export default function UserInfo({ userId }: { userId: string }) {
  const userInfo = use(fetchUserInfo(userId));

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Mobile:</strong> {userInfo.mobile}</p>
        {/* Add more user details as needed */}
      </CardContent>
    </Card>
  );
}