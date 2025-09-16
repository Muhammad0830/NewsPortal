import React, { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AdminSideBar";
import AdminNavBar from "@/components/AdminNavBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full">
        <AdminNavBar />
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
