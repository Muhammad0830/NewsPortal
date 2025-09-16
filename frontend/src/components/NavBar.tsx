"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import { cn } from "@/lib/cn";
import LangButton from "./LangButton";
import DarkLightMode from "./DarkLightMode";
import MenuButton from "./Menu";
import ProfileButton from "./ProfileButton";
import { useAuth } from "@/context/authContext";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "News", href: "/news" },
  { name: "Categories", href: "/categories" },
];

const NavBar = () => {
  const t = useTranslations("NavBar");
  const pathName = usePathname();
  const { user } = useAuth();

  if (pathName === "/") return;

  return (
    <div className="fixed w-full flex gap-4 justify-between items-center z-[999] shadow-[0px_0px_15px_1px_#00000050] dark:shadow-[0px_0px_15px_1px_#ffffff50] bg-[#ffffff50] dark:bg-[#00000050] backdrop-blur-md lg:px-[60px] md:px-[40px] sm:px-[30px] px-[20px] py-[15px]">
      <div>
        <span className="lg:text-[28px] sm:text-[24px] font-semibold text-[20px] text-black dark:text-white">
          News Portal
        </span>
      </div>

      <nav className="hidden sm:flex">
        <ul className="flex gap-2 md:text-[16px] text-sm">
          {navLinks.map((link, index) => (
            <li className="list-none" key={index}>
              <Link
                className={cn(
                  "group relative font-semibold",
                  pathName.startsWith(link.href)
                    ? "text-primary"
                    : "text-black dark:text-white"
                )}
                href={link.href}
              >
                {t(link.name)}
                <span
                  className={cn(
                    "absolute bottom-0 h-[2px] bg-primary rounded-full transition-all duration-300",
                    pathName.startsWith(link.href)
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
        {!user ? (
          <Link
            className={cn(
              "sm:flex hidden text-sm md:text-[16px] relative group text-white",
              pathName.startsWith("/auth")
                ? "text-primary"
                : "text-black dark:text-white"
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
        ) : null}
        <div className="flex gap-2">
          <LangButton />
          <DarkLightMode />
          <MenuButton />
          <ProfileButton />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
