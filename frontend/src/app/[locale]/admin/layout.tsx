"use client";
import React, { ReactNode, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AdminSideBar";
import AdminNavBar from "@/components/AdminNavBar";

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} className="relative">
      <AppSidebar />
      <main className="flex w-full relative">
        <AdminNavBar open={open} setOpen={setOpen} />
        <div className="pt-20 w-full md:px-[10px] px-[30px]">{children}</div>
      </main>
    </SidebarProvider>
  );
}
