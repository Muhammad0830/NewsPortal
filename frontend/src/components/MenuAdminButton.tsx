import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldUser,
  Undo2,
  User2,
  X,
} from "lucide-react";
import React, { useState } from "react";

const MenuAdminButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();

  return (
    <div className="z-[1000] md:hidden flex">
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="cursor-pointer p-1 border border-primary dark:border-primray/50 bg-primary/10 hover:bg-primary/30 rounded-sm flex justify-center items-center overflow-hidden"
      >
        <Menu className="sm:h-7 sm:w-7 w-5 h-5" />
      </button>
      <div
        className={cn(
          "fixed min-h-screen min-w-screen inset-0 bg-white dark:bg-black flex items-center justify-center transition-all duration-300",
          menuOpen ? "opacity-100 translate-x-0" : "translate-x-[-150%]"
        )}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-5 p-2"
        >
          <X className="w-10 h-10 cursor-pointer p-1.5 rounded-full bg-primary/10 border border-primary dark:border-primary/50 hover:bg-primary/30" />
        </button>
        <div className="flex flex-col p-2 gap-2">
          <Link
            onClick={() => setMenuOpen(false)}
            href={"/admin/dashboard"}
            className={cn(
              "lg:text-lg flex items-center gap-2 px-3 py-2 bg-primary/30 hover:bg-primary/80 rounded-sm",
              pathName === "/admin/dashboard" ? "bg-primary/80" : ""
            )}
          >
            <LayoutDashboard />
            <span className="">Dashboard</span>
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            href={"/admin/news"}
            className={cn(
              "lg:text-lg flex items-center gap-2 px-3 py-2 bg-primary/30 hover:bg-primary/80 rounded-sm",
              pathName === "/admin/news" ? "bg-primary/80" : ""
            )}
          >
            <FileText />
            <span>News</span>
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            href={"/admin/admins"}
            className={cn(
              "lg:text-lg flex items-center gap-2 px-3 py-2 bg-primary/30 hover:bg-primary/80 rounded-sm",
              pathName === "/admin/admins" ? "bg-primary/80" : ""
            )}
          >
            <ShieldUser />
            <span>Admins</span>
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            href={"/admin/profile"}
            className={cn(
              "lg:text-lg flex items-center gap-2 px-3 py-2 bg-primary/30 hover:bg-primary/80 rounded-sm",
              pathName === "/admin/profile" ? "bg-primary/80" : ""
            )}
          >
            <User2 />
            <span>Profile</span>
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            href={"/home"}
            className={cn(
              "lg:text-lg flex items-center gap-2 px-3 py-2 bg-primary/30 hover:bg-primary/80 rounded-sm"
            )}
          >
            <Undo2 />
            <span>Return to the user page</span>
          </Link>
          <Link
            onClick={() => setMenuOpen(false)}
            href={"/admin/admins"}
            className={cn(
              "lg:text-lg flex items-center gap-2 px-3 py-2 bg-primary/30 hover:bg-primary/80 rounded-sm"
            )}
          >
            <LogOut />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuAdminButton;
