"use client";
import FilterDropdown from "@/components/FilterDropdown";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./TableColumns";
import { Payment } from "@/types/types";

const filters = ["All", "Published", "Unpublished"];

const data: Payment[] = [
  {
    id: "1",
    title: "Title1",
    description: "Description",
    createdAt: "2023-03-01",
    status: "published",
  },
  {
    id: "2",
    title: "Title2",
    description: "Description",
    createdAt: "2023-03-01",
    status: "unpublished",
  },
  {
    id: "3",
    title: "Title3",
    description: "Description",
    createdAt: "2023-03-01",
    status: "unpublished",
  },
];

const Page = () => {
  const t = useTranslations("adminNews");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  return (
    <div>
      <div className="lg:text-2xl md:text-xl text-lg font-bold mb-4">
        All News
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
