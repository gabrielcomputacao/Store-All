'use client';

import './globals.css';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sideBar/Sidebar';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <div className="flex justify-start h-screen w-full">
              <div className="h-full">
                <AppSidebar />
              </div>
              <div className="w-full">
                <div className="flex w-full">
                  <div className="w-auto">
                    <SidebarTrigger />
                  </div>
                  <div className="w-full p-5">{children}</div>
                </div>
              </div>
            </div>
          </SidebarProvider>{' '}
        </QueryClientProvider>
      </body>
    </html>
  );
}
