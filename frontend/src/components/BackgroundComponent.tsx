"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const BackgroundComponent = () => {
  const { theme } = useTheme();
  const [mode, setMode] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    if (theme === "light") {
      setMode("light");
    } else if (theme === "dark") {
      setMode("dark");
    } else {
      setMode(null);
    }
  }, [theme]);

  return (
    <div className="fixed w-screen h-screen z-0">
      <div
        suppressHydrationWarning
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            mode === "light"
              ? "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)"
              : mode === "dark"
              ? "radial-gradient(125% 125% at 50% 10%, #000 50%, #192f5e 100%)"
              : "",
        }}
      />
    </div>
  );
};

export default BackgroundComponent;
