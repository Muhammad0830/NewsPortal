"use client";
import { cn } from "@/lib/cn";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";

const filters = ["All", "Published", "Unpublished"];

const FilterDropdown = ({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("adminNews");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    }

    if (filterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative lg:w-auto sm:min-w-[200px] sm:w-[150px] w-8 h-8 z-10 sm:text-[16px] text-xs"
    >
      <button
        onClick={() => setFilterOpen((prev) => !prev)}
        className={cn(
          "relative flex sm:px-2 justify-center items-center w-full h-full rounded-sm cursor-pointer border border-primary sm:bg-primary/30 sm:dark:bg-primary/50 hover:bg-primary/50 dark:hover:bg-primary/20",
          selectedFilter !== "All" ? "bg-primary/50" : ""
        )}
      >
        <span className="sm:flex hidden text-nowrap">
          {t("Filter by")} {t(selectedFilter || "All")}
        </span>
        <span className="flex sm:hidden w-4/5 h-4/5">
          <Filter className="w-full h-full" />
        </span>
      </button>

      <div
        className={cn(
          "sm:w-full min-w-[150px] sm:right-auto right-0 flex flex-col gap-1 absolute rounded-sm p-1.5 border border-primary bg-white dark:bg-black transition-all duration-300 origin-top-right sm:origin-top",
          filterOpen
            ? "top-[115%] opacity-[100] scale-[1]"
            : "top-[90%] opacity-0 scale-0 sm:scale-y-0"
        )}
      >
        <div className="absolute inset-0 z-0 bg-primary/10 dark:bg-primary/30 "></div>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setSelectedFilter(filter);
              setFilterOpen(false);
            }}
            className={cn(
              "px-2 py-1 cursor-pointer rounded-sm hover:bg-primary/20 dark:hover:bg-primary/40 z-10",
              filter === selectedFilter
                ? "bg-primary/20 dark:bg-primary/40"
                : ""
            )}
          >
            {t(filter)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterDropdown;
