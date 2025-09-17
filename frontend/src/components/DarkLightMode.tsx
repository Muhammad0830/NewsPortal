"use client";
import { cn } from "@/lib/cn";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const DarkLightMode = ({ isUserPage }: { isUserPage: boolean }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (theme === "light") {
      setIsLight(true);
    } else {
      setIsLight(false);
    }
  }, [theme]);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "relative border sm:h-10 h-8 aspect-square z-10 overflow-hidden rounded-full sm:p-1.5 p-1 cursor-pointer flex justify-center items-center",
        isUserPage
          ? "dark:bg-black border-black/40 dark:border-white/30"
          : "border-primary dark:border-primary/50 bg-primary/10 hover:bg-primary/30"
      )}
    >
      <Moon
        className={cn(
          "relative w-full h-full transition-translate duration-300 text-black dark:text-white",
          isLight
            ? "sm:translate-y-0 sm:opacity-100 opacity-100"
            : "sm:translate-y-[150%] sm:opacity-100 opacity-0"
        )}
      />
      <Sun
        className={cn(
          "absolute w-[80%] h-[80%] transition-translate duration-300 text-black dark:text-white",
          isLight
            ? "sm:translate-y-[-150%] sm:opacity-100 opacity-0"
            : "sm:translate-y-0 sm:opacity-100 opacity-100"
        )}
      />
      <div className="absolute"></div>
    </button>
  );
};

export default DarkLightMode;
