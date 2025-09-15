"use client";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "News", href: "/news" },
  { name: "Categories", href: "/categories" },
];

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("NavBar");
  const pathName = usePathname();
  const currentPath = pathName.split("/")[2];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "z-20 overflow-hidden relative flex items-center justify-center sm:hidden w-8 aspect-square cursor-pointer border border-black/40 dark:border-white/30 p-1 rounded-full transition-colors duration-300",
          isOpen ? "bg-red-500" : "bg-white dark:bg-black"
        )}
      >
        <Menu
          className={cn(
            "relative w-full h-full transition-translate duration-300 text-black dark:text-white",
            isOpen ? "translate-x-[-150%]" : "translate-x-0"
          )}
        />
        <X
          className={cn(
            "absolute w-[80%] h-[80%] transition-translate duration-300 text-black dark:text-white",
            isOpen ? "translate-x-0" : "translate-x-[150%]"
          )}
        />
      </button>
      <div
        className={cn(
          "absolute flex origin-top-right opacity-0 scale-[0] top-[80%] right-2  rounded-md bg-black dark:bg-white border border-white/30 dark:border-black/50 transition-all duration-300 z-10",
          isOpen && "scale-[1] opacity-100 top-[120%] right-0"
        )}
      >
        <ul className="flex flex-col items-center justify-start gap-2 p-2 rounded-md">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                className={cn(
                  "group relative text-nowrap",
                  `/${currentPath}` === link.href
                    ? "text-primary"
                    : "text-white dark:text-black"
                )}
                href={link.href}
              >
                {t(link.name)}
                <span
                  className={cn(
                    "absolute bottom-0 h-[2px] bg-primary rounded-full transition-all duration-300",
                    `/${currentPath}` == link.href
                      ? "left-[50%] right-[59%]"
                      : "left-[50%] right-[50%] group-hover:left-0 group-hover:right-0"
                  )}
                ></span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              className={cn(
                "group relative text-nowrap",
                currentPath.startsWith("auth")
                  ? "text-primary"
                  : "text-white dark:text-black"
              )}
              href="/auth?mode=signup"
            >
              {t("signup")}
              <span
                className={cn(
                  "absolute bottom-0 h-[2px] bg-primary rounded-full transition-all duration-300",
                  currentPath.startsWith("auth")
                    ? "left-[50%] right-[59%]"
                    : "left-[50%] right-[50%] group-hover:left-0 group-hover:right-0"
                )}
              ></span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuButton;
