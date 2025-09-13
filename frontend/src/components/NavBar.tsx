"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import LangButton from "./LangButton";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "News", href: "/news" },
];

const NavBar = () => {
  const t = useTranslations("NavBar");
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex gap-4 justify-between items-center z-[999] bg-[#222222] lg:px-[60px] md:px-[40px] sm:px-[30px] px-[20px] py-[15px]">
      <div>
        <span className="lg:text-[28px] sm:text-[24px] font-semibold text-[20px]">
          News Portal
        </span>
      </div>

      <nav className="hidden sm:flex">
        <ul className="flex gap-2 md:text-[16px] text-sm">
          {navLinks.map((link, index) => (
            <li className="list-none" key={index}>
              <Link
                className={cn(
                  "group relative",
                  pathName === link.href && "text-primary"
                )}
                href={link.href}
              >
                {t(link.name)}
                <span
                  className={cn(
                    "absolute bottom-0 h-[2px] bg-primary rounded-full transition-all duration-300",
                    pathName == link.href
                      ? "left-[50%] right-[59%]"
                      : "left-[50%] right-[50%] group-hover:left-0 group-hover:right-0"
                  )}
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <Link
          className={cn(
            "text-sm md:text-[16px] relative group",
            pathName.startsWith("/auth") && "text-primary"
          )}
          href={"/auth?mode=signup"}
        >
          {t("signup")}
          <span
            className={cn(
              "absolute bottom-0 h-[2px] bg-primary rounded-full transition-all duration-300",
              pathName.startsWith("/auth")
                ? "left-[50%] right-[59%]"
                : "left-[50%] right-[50%] group-hover:left-0 group-hover:right-0"
            )}
          ></span>
        </Link>
        <div className="flex gap-2">
          <LangButton />
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "z-20 overflow-hidden relative flex items-center justify-center sm:hidden w-8 aspect-square cursor-pointer border border-white/30 p-1 rounded-full transition-colors duration-300",
                isOpen ? "bg-red-500" : "bg-black"
              )}
            >
              <Menu
                className={cn(
                  "relative w-full h-full transition-translate duration-300",
                  isOpen ? "translate-x-[-150%]" : "translate-x-0"
                )}
                color="#fff"
              />
              <X
                className={cn(
                  "absolute w-[80%] h-[80%] transition-translate duration-300",
                  isOpen ? "translate-x-0" : "translate-x-[150%]"
                )}
                color="#fff"
              />
            </button>
            <div
              className={cn(
                "absolute flex origin-top-right opacity-0 scale-[0] top-[80%] right-2  rounded-md bg-black border border-white/30 transition-all duration-300 z-10",
                isOpen && "scale-[1] opacity-100 top-[120%] right-0"
              )}
            >
              <ul className="flex flex-col items-center justify-start gap-2 p-2 rounded-md">
                {navLinks.map((link, index) => (
                  <li key={index} className="">
                    <Link
                      className={cn(
                        "group relative text-white dark:text-black",
                        pathName === link.href && "text-primary"
                      )}
                      href={link.href}
                    >
                      {t(link.name)}
                      <span
                        className={cn(
                          "absolute bottom-0 h-[2px] bg-primary rounded-full transition-all duration-300",
                          pathName == link.href
                            ? "left-[50%] right-[59%]"
                            : "left-[50%] right-[50%] group-hover:left-0 group-hover:right-0"
                        )}
                      ></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
