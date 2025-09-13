"use client";
import { cn } from "@/lib/cn";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const DarkLightMode = () => {
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
      className="relative border border-white/30 sm:h-10 h-8 aspect-square bg-black overflow-hidden rounded-full sm:p-1.5 p-1 cursor-pointer flex justify-center items-center"
    >
      <Moon
        className={cn(
          "relative w-full h-full transition-translate duration-300",
          isLight
            ? "sm:translate-y-0 sm:opacity-100 opacity-100"
            : "sm:translate-y-[150%] sm:opacity-100 opacity-0"
        )}
        color="#fff"
      />
      <Sun
        className={cn(
          "absolute w-[80%] h-[80%] transition-translate duration-300",
          isLight
            ? "sm:translate-y-[-150%] sm:opacity-100 opacity-0"
            : "sm:translate-y-0 sm:opacity-100 opacity-100"
        )}
        color="#fff"
      />
      <div className="absolute"></div>
    </button>
  );
};

export default DarkLightMode;
