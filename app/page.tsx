import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Personal Finance Management</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Take control of your finances with our powerful tools and insights.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">Demo Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}