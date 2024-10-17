import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { ClientSessionProvider } from "@/components/ClientSessionProvider"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personal Finance Management',
  description: 'Manage your finances with ease',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex w-full flex-col overflow-hidden">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}