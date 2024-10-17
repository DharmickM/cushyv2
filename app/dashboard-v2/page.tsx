"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { FinancialHealthMetrics } from "@/components/dashboard/financial-health-metrics"
import { NetWorthChart } from "@/components/dashboard/net-worth-chart"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"

interface UserInfo {
  id: string;
  email: string;
  mobile: string;
  firstName: string;
  lastName: string;
  name: string;
}

export default function DashboardV2() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Fetch user info
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

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex items-center justify-between p-4 md:justify-end">
          <h2 className="text-3xl font-bold tracking-tight md:hidden">Dashboard V2</h2>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          <h1 className="text-3xl font-bold mb-4">Welcome, {userInfo?.name || 'User'}</h1>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <ErrorBoundary fallback={<div>Error loading financial health metrics</div>}>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <FinancialHealthMetrics />
                </div>
              </ErrorBoundary>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Net Worth</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ErrorBoundary fallback={<div>Error loading net worth chart</div>}>
                      <NetWorthChart />
                    </ErrorBoundary>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ErrorBoundary fallback={<div>Error loading recent transactions</div>}>
                      <RecentTransactions />
                    </ErrorBoundary>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics">
              <ErrorBoundary fallback={<div>Error loading overview</div>}>
                <Overview />
              </ErrorBoundary>
            </TabsContent>
          </Tabs>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}