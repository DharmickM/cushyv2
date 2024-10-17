"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface UserInfo {
  id: string;
  email: string;
  mobile: string;
  firstName: string;
  lastName: string;
  name: string;
}

export default function SettingsPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = '6cf03348-7603-4165-a396-5ace94a77959'; // In a real app, this should be dynamically determined
        const response = await fetch(`/api/basiq/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }
        const data = await response.json();
        setUserInfo({
          id: data.id,
          email: data.email,
          mobile: data.mobile,
          firstName: data.firstName,
          lastName: data.lastName,
          name: data.name || `${data.firstName} ${data.lastName}`.trim() || 'Unknown User'
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to load user information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated user info to your API
    console.log('Updated user info:', userInfo);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userInfo) {
    return <div>No user information available</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={userInfo.firstName}
                  onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={userInfo.lastName}
                  onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                value={userInfo.mobile}
                onChange={(e) => setUserInfo({...userInfo, mobile: e.target.value})}
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}