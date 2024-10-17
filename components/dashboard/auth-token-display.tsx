"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AuthTokenDisplay() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchToken = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/basiq/auth');
      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }
      const data = await response.json();
      setToken(data.token);
    } catch (err) {
      setError('Error fetching token');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <Card>
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
  );
}