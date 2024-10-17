"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getToken } from '@/lib/basiq-auth';

interface UserInfo {
  id: string;
  email: string;
  mobile: string;
  firstName?: string;
  lastName?: string;
  // Add other fields as needed
}

export default function DevPage() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchToken = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
    } catch (err) {
      setError('Error fetching token: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    if (!userId) {
      setError('Please enter a user ID');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/basiq/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
      const data = await response.json();
      const extractedUserInfo: UserInfo = {
        id: data.id,
        email: data.email,
        mobile: data.mobile,
        firstName: data.firstName,
        lastName: data.lastName,
        // Add other fields as needed
      };
      setUserInfo(extractedUserInfo);
    } catch (err) {
      setError('Error fetching user info: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dev Testing Page</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Auth Token</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {token && (
            <div>
              <p className="text-sm font-medium mb-2">Token:</p>
              <p className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-24">{token}</p>
            </div>
          )}
          <Button onClick={fetchToken} className="mt-4">Refresh Token</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <Button onClick={fetchUserInfo}>Fetch User Info</Button>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {userInfo && (
            <div>
              <p className="text-sm font-medium mb-2">User Info:</p>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-64">
                {JSON.stringify(userInfo, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}