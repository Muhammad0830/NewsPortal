"use client";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  ShieldUser,
  Undo2,
  User,
  User2,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function AppSidebar() {
  const pathName = usePathname();
  const router = useRouter();
  const { user, logout, success, error, setSuccess, setError } = useAuth();

  useEffect(() => {
    if (success === "logout") {
      toast("Successfull logged out", { description: "Come back anytime!" });
      router.push('/auth?mode=signin');
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
            <span className="relative">
              News Portal
              <span className="absolute text-sm right-[0] translate-3/5 bottom-0">
                Admins
              </span>
            </span>
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
                  <span>Dashboard</span>
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
                  <span>News</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem
                className={cn(
                  "rounded-sm px-2 py-1 hover:bg-primary/20 dark:hover:bg-primary/40",
                  pathName.includes("/admins")
                    ? "bg-primary/20 dark:hover:bg-primary/40"
                    : ""
                )}
              >
                <Link
                  href={"/admin/admins"}
                  className="lg:text-lg flex items-center gap-2"
                >
                  <ShieldUser />
                  <span>Admins</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem
                className={cn(
                  "rounded-sm px-2 py-1 hover:bg-primary/20 dark:hover:bg-primary/40",
                  pathName.includes("/users")
                    ? "bg-primary/20 dark:hover:bg-primary/40"
                    : ""
                )}
              >
                <Link
                  href={"/admin/users"}
                  className="lg:text-lg flex items-center gap-2"
                >
                  <Users />
                  <span>Users</span>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem className="rounded-sm px-2 py-1.5 hover:bg-primary/20 dark:hover:bg-primary/40">
                <Link
                  href={"/home"}
                  className="lg:text-lg flex items-center gap-2"
                >
                  <Undo2 />
                  <span>Go back</span>
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
                  "relative rounded-sm hover:bg-primary/20 dark:hover:bg-primary/40",
                  pathName.includes("/news")
                    ? "bg-primary/20 dark:hover:bg-primary/40"
                    : ""
                )}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className=" md:h-[50px] cursor-pointer h-[46px] border border-black/40 dark:border-white/40 flex rounded-sm px-2 py-1 bg-primary/5 dark:bg-primary/5 hover:bg-primary/20">
                      <Link
                        href={"/admin/profile"}
                        className="lg:text-lg flex items-center gap-2"
                      >
                        <div className="p-1 aspect-square border border-black/40 dark:border-white/40 flex justify-center items-center rounded-full bg-primary/10 dark:bg-primary/20">
                          <User />
                        </div>
                        <div className="flex flex-col justify-center">
                          <span className="text-sm font-bold">
                            {user?.user.name}
                          </span>
                          <span className="text-sm font-semibold text-black/70 dark:text-white/70 line-clamp-1">
                            {user?.user.email}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="bg-primary/30 dark:bg-primary/15 w-[15rem] border border-white z-[999] p-1.5 flex flex-col gap-1"
                  >
                    <div className="hover:bg-white dark:hover:bg-[#010420] rounded-sm px-2 py-1">
                      <Link
                        href={`/admin/profile/${user?.user.email}`}
                        className="lg:text-lg flex items-center gap-2"
                      >
                        <User2 />
                        <span>Profile</span>
                      </Link>
                    </div>
                    <Link
                      onClick={() => handleLogout()}
                      href={"/auth?mode=signin"}
                      className="lg:text-lg flex items-center gap-2 px-2 py-1.5 hover:bg-white dark:hover:bg-[#010420] border text-red-500 border-red-500 rounded-sm"
                    >
                      <div className="w-6 h-6 relative">
                        <LogOut className="w-full h-full" />
                      </div>
                      <span>Logout</span>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
