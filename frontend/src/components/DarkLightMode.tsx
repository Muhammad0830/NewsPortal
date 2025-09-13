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
      className="relative border border-white/30 h-10 aspect-square bg-black overflow-hidden rounded-full sm:p-1.5 p-1 cursor-pointer flex justify-center items-center"
    >
      <Moon
        className={cn(
          "relative w-full h-full transition-translate duration-300",
          isLight ? "translate-y-0" : "translate-y-[150%]"
        )}
        color="#fff"
      />
      <Sun
        className={cn(
          "absolute w-[80%] h-[80%] transition-translate duration-300",
          isLight ? "translate-y-[-150%]" : "translate-y-0"
        )}
        color="#fff"
      />
      <div className="absolute"></div>
    </button>
  );
};

export default DarkLightMode;
