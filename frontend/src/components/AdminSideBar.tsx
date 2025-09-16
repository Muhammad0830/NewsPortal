"use client";
import { FileText, LayoutDashboard, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { toast } from "sonner";
export function AppSidebar() {
  const pathName = usePathname();
  const { logout, success, error, setSuccess, setError } = useAuth();

  useEffect(() => {
    if (success === "logout") {
      toast("Successfull logged out", { description: "Come back anytime!" });
    }
    setSuccess(null);
  }, [success]); // eslint-disable-line

  useEffect(() => {
    if (error === "logout") {
      toast("Failed to Logout", { description: "Please try again later" });
      setError(null);
    }
  }, [error]); // eslint-disable-line

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Sidebar className="z-[999]">
      <SidebarContent className="pt-0 flex flex-col justify-between bg-primary/10 dark:bg-primary/5">
        <SidebarGroup className="md:p-3 md:pt-0 pt-0">
          <div className="lg:text-[28px] sm:text-[24px] text-[20px] py-[15px] font-semibold text-center pr-2">
            News Portal
          </div>
          <Separator className="bg-primary dark:bg-[#234264] mb-2" />
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem
                className={cn(
                  "rounded-sm hover:bg-primary/20 dark:hover:bg-primary/40 px-2 py-1",
                  pathName.includes("/dashboard")
                    ? "bg-primary/20 dark:bg-primary/40"
                    : ""
                )}
              >
                <Link
                  href={"/admin/dashboard"}
                  className="lg:text-lg flex items-center gap-2"
                >
                  <LayoutDashboard />
                  <span className="">Dashboard</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem
                className={cn(
                  "rounded-sm px-2 py-1 hover:bg-primary/20 dark:hover:bg-primary/40",
                  pathName.includes("/news")
                    ? "bg-primary/20 dark:hover:bg-primary/40"
                    : ""
                )}
              >
                <Link
                  href={"/admin/news"}
                  className="lg:text-lg flex items-center gap-2"
                >
                  <FileText />
                  <span className="">News</span>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem
                className={cn(
                  "rounded-sm cursor-pointer border border-red-400 text-red-400 dark:border-red-500 dark:text-red-500 hover:border-red-600 hover:text-red-600 dark:hover:text-red-600 dark:hover:border-red-600",
                  pathName.includes("/news")
                    ? "bg-primary/10 dark:bg-primary/20 hover:bg-primary/10 dark:hover:bg-primary/20"
                    : ""
                )}
              >
                <Link
                  onClick={() => handleLogout()}
                  href={"/auth?mode=signin"}
                  className="lg:text-lg flex items-center gap-2 px-3 py-2"
                >
                  <LogOut />
                  <span className="">Logout</span>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
