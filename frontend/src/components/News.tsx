"use client";
import React from "react";
import { News } from "@/types/types";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";

const NewsCard = ({ news, index }: { news: News; index: number }) => {
  const t = useTranslations("News");
  const created_atData = new Date(news.created_at);
  const updatedCreatedAt = created_atData.toLocaleDateString();

  return (
    <Link
      href={`/news/${news.id}`}
      className={cn(
        "sm:rounded-md rounded-sm cursor-pointer group overflow-hidden border border-black/50 dark:border-white/50 flex flex-col",
        "hover:translate-y-[-3px] shadow-[0] hover:shadow-lg shadow-black/30 dark:shadow-white/10 transition-all duration-300"
      )}
    >
      <div className="relative aspect-video scale-[1] sm:rounded-md rounded-sm overflow-hidden">
        <Image
          src={`/images/news${index + 1}.jpg`}
          alt="news"
          fill
          className="object-cover group-hover:scale-[1.1] transition-scale duration-300"
        />
        <div className="absolute top-2 right-2 md:group-hover:opacity-100 md:opacity-0 md:translate-y-[5px] md:group-hover:translate-y-0 rounded-sm bg-white dark:bg-black px-1 pb-0.5 text-sm font-semibold flex items-center justify-center transition-all duration-300">
          {t("Read more")}
        </div>
      </div>
      <div className="p-2 flex flex-col gap-1">
        <div className="sm:text-xs text-[10px] text-black/60 dark:text-white/60">
          {updatedCreatedAt}
        </div>
        <div className="md:text-xl sm:text-lg text-sm sm:font-bold font-semibold line-clamp-1">
          {news.title}
        </div>
        <div className="md:text-[16px] sm:text-sm text-xs sm:font-semibold font-normal line-clamp-1">
          {news.newsText}
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
