"use client"

import { useState, useEffect } from 'react';
import { SidebarDemo } from "@/components/layout/sidebar2"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full border-t border-neutral-200 dark:border-neutral-700 overflow-hidden min-h-[calc(100vh-3.5rem)]">
      <SidebarDemo open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center p-4 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-white dark:bg-neutral-900 rounded-tl-2xl border-t border-l border-neutral-200 dark:border-neutral-700">
          {children}
        </main>
      </div>
    </div>
  );
}