"use client";
import React, { useEffect, useRef, useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { User } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const AdminNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const openBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openBtnRef.current &&
        !openBtnRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="lg:h-[72px] md:h-[68px] h-[64px] px-4 py-2 flex gap-2 justify-between items-center w-full backdrop-blur-md shadow-[0px_0px_15px_1px_#00000050] dark:shadow-[0px_0px_15px_1px_#ffffff50] z-[998]">
      {/* sidebar trigger button */}
      <div className="cursor-pointer border rounded-sm flex justify-center items-center overflow-hidden">
        <SidebarTrigger className="cursor-pointer rounded-sm" />
      </div>

      {/* profile button */}
      <div className="relative" ref={openBtnRef}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative rounded-full cursor-pointer w-10 h-10 bg-primary/20 dark:bg-primary/40 hover:bg-primary/40 dark:hover:bg-primary/60 border border-black/40 dark:border-white/40 flex justify-center items-center z-[999] transition-colors duration-200"
        >
          <User />
        </button>
        <div
          className={cn(
            "absolute right-0 p-2 bg-white dark:bg-black border border-black/40 dark:border-white/40 rounded-md duration-300 transition-all z-[998]",
            isOpen
              ? "top-[115%] opacity-100 scale-[1]"
              : "top-0 opacity-0 scale-[0]"
          )}
        >
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="min-w-[200px] md:h-[50px] h-[46px] border border-black/40 dark:border-white/40 flex rounded-sm px-2 py-1 bg-primary/5 dark:bg-primary/5 hover:bg-primary/20 dark:hover:bg-primary/40"
          >
            <Link
              href={"/admin/profile"}
              className="lg:text-lg flex items-center gap-2"
            >
              <div className="p-1 aspect-square border border-black/40 dark:border-white/40 flex justify-center items-center rounded-full bg-primary/10 dark:bg-primary/20">
                <User />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm font-bold">{user?.user.name}</span>
                <span className="text-sm font-semibold text-black/70 dark:text-white/70 line-clamp-1">
                  {user?.user.email}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
