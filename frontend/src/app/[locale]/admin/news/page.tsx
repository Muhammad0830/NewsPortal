"use client";
import FilterDropdown from "@/components/FilterDropdown";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./TableColumns";
import { News } from "@/types/types";
import useApiQuery from "@/hooks/useApiQiery";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";

const Page = () => {
  const t = useTranslations("adminNews");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [data, setData] = useState<News[]>([]);
  const { data: newsData, isLoading } = useApiQuery<News[]>("/news", ["news"]);
  const router = useRouter();

  useEffect(() => {
    if (newsData) {
      setData(newsData);
    }
  }, [newsData]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-4 mt-2 flex items-center justify-between gap-2">
        <span className="lg:text-3xl md:text-xl text-lg font-bold">
          All News
        </span>
        <Button
          onClick={() => router.push("/admin/news/create")}
          className="cursor-pointer bg-primary/30 hover:bg-primary/60 dark:bg-primary/50 dark:hover:bg-primary/30 border border-primary text-black dark:text-white"
        >
          Create News
        </Button>
      </div>
      {/* search & filter */}
      <div className="flex gap-2 items-center justify-between w-full mb-4 z-10 relative">
        <div className="md:min-w-[300px] sm:min-w-[200px] min-w-[150px] w-[30%] h-8">
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

      <div className="relative z-0">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Page;
