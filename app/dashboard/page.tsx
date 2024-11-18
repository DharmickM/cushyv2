"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { FinancialHealthMetrics } from "@/components/dashboard/financial-health-metrics"
import { NetWorthChart } from "@/components/dashboard/net-worth-chart"
import { ErrorBoundary } from "@/components/error-boundary"

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight"></h2>
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
              <CardContent className="h-[400px]">
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
  );
}