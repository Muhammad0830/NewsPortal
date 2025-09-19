"use client";
import useApiQuery from "@/hooks/useApiQiery";
import { Link, useRouter } from "@/i18n/navigation";
import { NewsData } from "@/types/types";
import { ArrowLeft, Link as LinkIcon, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const id = params?.id;
  const t = useTranslations("adminNews");
  const [news, setNews] = useState<NewsData | null>(null);
  const router = useRouter();

  const { data: newsData, isLoading } = useApiQuery<NewsData>(
    `/news/each/${id}`,
    ["EachNews"]
  );

  useEffect(() => {
    if (newsData) setNews(newsData);
  }, [newsData]);

  if (isLoading) return <div className="pt-20">Loading...</div>;

  if (!id || !news)
    return <div className="pt-20">{t("No such news found")}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <div className="lg:text-3xl sm:text-xl text-lg font-bold">
          {t("Single News Page")}
        </div>
        <div className="flex items-center gap-2 ">
          <button
            onClick={() => router.push("/admin/news")}
            className="border border-primary bg-primary/40 dark:bg-primary/20 hover:bg-primary/60 dark:hover:bg-primary/10  rounded-sm cursor-pointer px-2 py-1 flex justify-between gap-2 items-center"
          >
            <div className="h-4 aspect-square">
              <ArrowLeft className="w-full h-full" />
            </div>
            <span className="font-semibold">{t("Back")}</span>
          </button>
          <button
            onClick={() => router.push(`/admin/news/edit/${id}`)}
            className="border border-primary bg-primary/40 dark:bg-primary/20 hover:bg-primary/60 dark:hover:bg-primary/10  rounded-sm cursor-pointer px-2 py-1 flex justify-between gap-2 items-center"
          >
            <div className="h-4 aspect-square">
              <Pencil className="w-full h-full" />
            </div>
            <span className="font-semibold">{t("Edit")}</span>
          </button>
        </div>
      </div>
      <div className="w-full mt-5 rounded-md md:p-4 p-2 mb-6 border border-primary">
        <div className="mb-3 relative lg:min-w-[800px] lg:max-h-[300px] sm:min-w-[500px] min-w-[200px] sm:w-[65vw] w-[100%] max-w-[600px] aspect-video mx-auto rounded-md overflow-hidden">
          <Image
            src={news.mainImage}
            alt="news"
            fill
            className="object-cover"
          />
        </div>
        <div className="sm:text-2xl text-xl font-bold">{news.mainTitle}</div>
        <div className="flex flex-col gap-2">
          {news.contents.map((c, index) => {
            switch (c.type) {
              case "title":
                return (
                  <div className="sm:text-xl text-lg font-semibold" key={index}>
                    {c.content}
                  </div>
                );
              case "newsText":
                return (
                  <div className="sm:text-[16px] text-sm" key={index}>
                    {c.content}
                  </div>
                );
              case "link":
                return (
                  <Link
                    href={c.content.url}
                    className="text-primary flex gap-1 items-center"
                    key={index}
                  >
                    <LinkIcon className="sm:w-4 w-3.5 aspect-square" />
                    <span className="sm:text-[16px] text-sm">
                      {c.content.label}
                    </span>
                  </Link>
                );
              case "image":
                if (c.content) {
                  if (c.content.length === 1) {
                    return (
                      <div
                        className="md:min-w-[250px] min-w-[200px] sm:w-[50vw] w-[70vw] mx-auto max-w-[500px] relative aspect-video overflow-hidden rounded-md"
                        key={index}
                      >
                        <Image
                          className="object-cover"
                          src={c.content[0]}
                          // src="/images/news1.jpg"
                          alt={`news${c.order}`}
                          fill
                        />
                      </div>
                    );
                  } else if (c.content.length > 1 && Array.isArray(c.content)) {
                    return (
                      <div className="flex flex-col items-center" key={index}>
                        <div className="lg:max-w-[1200px] w-full sm:grid grid-cols-2 flex flex-col md:gap-4 ld:gap-6 gap-2">
                          {c.content.map((img, indexImage) => (
                            <div
                              className="sm:w-auto w-[70vw] max-sm:mx-auto relative aspect-video overflow-hidden rounded-md"
                              key={indexImage}
                            >
                              <Image
                                className="object-cover"
                                src={img}
                                // src={'/images/news1.jpg'}
                                alt={`news${c.order}`}
                                fill
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                }
                break;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
