"use client";
import FilterDropdown from "@/components/FilterDropdown";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./TableColumns";
import { NewsResponse } from "@/types/types";
import useApiQuery from "@/hooks/useApiQiery";
import { useRouter } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const Page = () => {
  const t = useTranslations("adminNews");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [page, setPage] = useState(1);
  const limit = 10;
  // let totalPages = 1;
  // let totalNews = 0;
  const {
    data: newsData,
    isLoading,
    refetch,
  } = useApiQuery<NewsResponse>(`/news?page=${page}&limit=${limit}`, [
    "news",
    page,
    limit,
  ]);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const {
    news: data,
    totalNews,
    totalPages,
  } = newsData ? newsData : { news: [], totalNews: 0, totalPages: 0 };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-4 mt-2 flex items-center justify-between gap-2">
        <span className="lg:text-3xl md:text-xl text-lg font-bold">
          {t("All News")}
        </span>
        <button
          onClick={() => router.push("/admin/news/create")}
          className="rounded-sm px-2 py-1 cursor-pointer bg-primary/30 hover:bg-primary/60 dark:bg-primary/50 dark:hover:bg-primary/30 border border-primary text-black dark:text-white sm:text-[16px] text-xs"
        >
          {t("Create News")}
        </button>
      </div>
      {/* search & filter */}
      <div className="flex gap-2 items-center justify-between w-full mb-4 z-10 relative">
        <div className="md:min-w-[250px] lg:min-w-[300px] min-w-[200px] w-[30%] h-8">
          <input
            type="text"
            className="w-full h-full p-2 rounded-sm bg-primary/30 dark:bg-primary/50 border border-primary"
            placeholder={`${t("type to search")}`}
          />
        </div>

        <FilterDropdown
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
        />
      </div>

      <div className="relative z-0 mb-2">
        <DataTable columns={columns(refetch, locale)} data={data} />
      </div>

      <div className="flex gap-2 items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {t("totalNews")}: {totalNews}
          </span>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={cn(
              "border border-primary bg-primary/40 dark:bg-primary/20 hover:bg-primary/60 dark:hover:bg-primary/10 cursor-pointer px-2 py-0.5 rounded-sm ",
              page === 1
                ? "opacity-50 cursor-default hover:bg-primary/40 dark:hover:bg-primary/20"
                : ""
            )}
          >
            {t("Previous")}
          </button>
          <button
            onClick={() => setPage(1)}
            className={cn(
              "border border-primary bg-primary/40 dark:bg-primary/20 hover:bg-primary/60 dark:hover:bg-primary/10 cursor-pointer px-2 py-0.5 rounded-sm ",
              page === 1 ? "hidden" : "flex"
            )}
          >
            1
          </button>
          <div className="px-2 py-0.5 border border-primary rounded-sm cursor-default">
            {page}
          </div>
          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className={cn(
              "border border-primary bg-primary/40 dark:bg-primary/20 hover:bg-primary/60 dark:hover:bg-primary/10 cursor-pointer px-2 py-0.5 rounded-sm ",
              page === totalPages ? "hidden" : "flex"
            )}
          >
            {totalPages}
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className={cn(
              "border border-primary bg-primary/40 dark:bg-primary/20 hover:bg-primary/60 dark:hover:bg-primary/10 cursor-pointer px-2 py-0.5 rounded-sm ",
              page === totalPages
                ? "opacity-50 cursor-default hover:bg-primary/40 dark:hover:bg-primary/20"
                : ""
            )}
          >
            {t("Next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
