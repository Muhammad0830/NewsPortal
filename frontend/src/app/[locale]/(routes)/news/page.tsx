"use client";
import NewsCard from "@/components/News";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useApiQuery from "@/hooks/useApiQiery";
import { cn } from "@/lib/cn";
import { Category, NewsResponse } from "@/types/types";
import { Check, Filter, X } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

const Page = () => {
  const t = useTranslations("News");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading } = useApiQuery<Category[]>("/news/categories", [
    "Category",
  ]);

  const { data: newsData, isLoading: isNewsLoading } =
    useApiQuery<NewsResponse>(`/news?limit=${limit}&page=${page}`, ["news"]);

  useEffect(() => {
    if (data) setCategories(data);
  }, [data]);

  const {
    news: news,
    totalNews,
    totalPages,
  } = newsData ? newsData : { news: [], totalNews: 0, totalPages: 0 };

  if (isLoading || isNewsLoading) return <div>Loading...</div>;

  return (
    <div className="pt-20 lg:px-[60px] md:px-[40px] sm:px-[30px] px-[20px]">
      <div className="lg:text-3xl md:text-xl sm:text-lg text-[16px] font-semibold mt-4 text-center">
        {t("BeTheFirst")}
      </div>

      {/* news section */}
      <section className="mt-4">
        {/* search & filter */}
        <div className="flex justify-between gap-2 items-center w-full">
          <div className="border border-primary flex overflow-hidden sm:min-w-[300px] min-w-[200px] sm:w-[30vw] w-[60vw] sm:h-8 h-6 rounded-sm">
            <input
              type="text"
              className="px-2 py-0.5 w-full h-full text-primary sm:text-[16px] text-xs"
              placeholder={t("Search news by title")}
            />
          </div>

          <div className="flex gap-2 items-center">
            <button
              className={cn(
                "items-center justify-center cursor-pointer sm:h-8 h-6 aspect-square rounded-sm border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200",
                selectedFilters.length === 0 ? "hidden" : "flex"
              )}
              onClick={() => setSelectedFilters([])}
            >
              <X className="w-[90%] h-[90%" />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className={cn(
                    "sm:h-8 h-6 aspect-square sm:p-1.5 p-0.5 cursor-pointer rounded-sm border-[1px] border-primary hover:text-white hover:bg-primary transition-colors duration-200",
                    selectedFilters.length > 0
                      ? "text-white bg-primary"
                      : "text-primary bg-transparent"
                  )}
                >
                  <Filter className="w-full h-full" />
                </button>
              </DialogTrigger>
              <DialogContent aria-description="Filter" className="min-w-[60vw]">
                <DialogTitle>{t("Filter")}</DialogTitle>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-4 md:gap-3 gap-2">
                  {categories.length > 0 &&
                    categories.map((categ, index) => (
                      <button
                        className={cn(
                          "px-1.5 py-0.5 group cursor-pointer flex items-center justify-between gap-2 rounded-sm text-black dark:text-white border border-black dark:border-white font-semibold transition-all duration-200",
                          selectedFilters.includes(categ.category)
                            ? "bg-primary"
                            : ""
                        )}
                        key={index}
                        onClick={() => {
                          if (selectedFilters.includes(categ.category)) {
                            setSelectedFilters((prev) =>
                              prev.filter((item) => item !== categ.category)
                            );
                          } else {
                            setSelectedFilters((prev) => [
                              ...prev,
                              categ.category,
                            ]);
                          }
                        }}
                      >
                        <span className="group-hover:translate-x-[5px] transition-translate duration-200">
                          {t(`${categ.name}`)}
                        </span>
                        <div
                          className={cn(
                            "h-[85%] aspect-square flex items-center justify-center border border-black dark:border-white rounded-full transition-all duration-200",
                            selectedFilters.includes(categ.category)
                              ? "opcacity-100"
                              : "opacity-0"
                          )}
                        >
                          <Check className="w-[90%] h-[90%] dark:text-white text-black" />
                        </div>
                      </button>
                    ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* news list */}
        {news.length === 0 ? null : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 min-[400px]:grid-cols-2 grid-cols-1 lg:gap-6 sm:gap-4 gap-3 sm:mt-6 mt-3 mb-6">
            {news.map((n, index) => (
              <NewsCard key={index} index={index} news={n} />
            ))}
          </div>
        )}

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
      </section>
    </div>
  );
};

export default Page;
