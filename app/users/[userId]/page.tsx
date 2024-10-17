import { Suspense } from 'react';
import UserInfo from './UserInfo';

export default function UserPage({ params }: { params: { userId: string } }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Information</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UserInfo userId={params.userId} />
      </Suspense>
    </div>
  );
}