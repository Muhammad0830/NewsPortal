"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Globe } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const LangAdminButton = () => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const pathName = usePathname();
  const openBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openBtnRef.current &&
        !openBtnRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    }

    if (langMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langMenuOpen]);

  return (
    <div className="relative" ref={openBtnRef}>
      <button
        onClick={() => setLangMenuOpen((prev) => !prev)}
        className="relative rounded-full cursor-pointer sm:w-10 sm:h-10 w-8 h-8 bg-primary/10 hover:bg-primary/30 border border-primary dark:border-primary/50 flex justify-center items-center z-[999] transition-colors duration-200"
      >
        <Globe />
      </button>
      <div
        className={cn(
          "absolute right-0 flex flex-col gap-0.5 origin-right transition-all duration-300 bg-white dark:bg-black border border-primary dark:border-primary/50 rounded-sm p-1",
          langMenuOpen
            ? "opacity-100 top-[115%] scale-[1]"
            : "scale-[0] top-[0%] opacity-0"
        )}
      >
        <Link
          href={`${pathName}`}
          locale="en"
          className="rounded-sm px-2 py-1 bg-primary/10 hover:bg-primary/30 cursor-pointer"
        >
          English
        </Link>
        <Link
          href={`${pathName}`}
          locale="ru"
          className="rounded-sm px-2 py-1 bg-primary/10 hover:bg-primary/30 cursor-pointer"
        >
          Русский
        </Link>
        <Link
          href={`${pathName}`}
          locale="uz"
          className="rounded-sm px-2 py-1 bg-primary/10 hover:bg-primary/30 cursor-pointer"
        >
          O`zbekcha
        </Link>
      </div>
    </div>
  );
};

export default LangAdminButton;
