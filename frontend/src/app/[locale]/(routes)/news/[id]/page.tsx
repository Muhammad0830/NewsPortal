"use client";
import useApiQuery from "@/hooks/useApiQiery";
import { Link } from "@/i18n/navigation";
import { NewsData } from "@/types/types";
import { ArrowLeft, Link as LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const id = params?.id;
  const t = useTranslations("News");
  const [news, setNews] = useState<NewsData | null>(null);

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
    <div className="pt-20 lg:px-[60px] md:px-[40px] sm:px-[30px] px-[20px]">
      <div className="flex mt-4">
        <button className="border border-black dark:border-white rounded-sm cursor-pointer px-1.5 py-0.5 flex gap-2 items-center">
          <div className="h-4 aspect-square">
            <ArrowLeft className="w-full h-full" />
          </div>
          <span className="font-semibold">{t("Go back to news")}</span>
        </button>
      </div>
      <div className="w-full mt-5 shadow-[0px_0px_30px_2px_#000000] rounded-md p-2 mb-6">
        <div className="mb-3 relative lg:min-w-[800px] lg:max-h-[300px] sm:min-w-[500px] min-w-[200px] sm:w-[65vw] w-[100%] max-w-[600px] aspect-video mx-auto rounded-md overflow-hidden">
          <Image
            src={"/images/news1.jpg"}
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
                          // src={c.content[0]}
                          src="/images/news1.jpg"
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
                                // src={img}
                                src={'/images/news1.jpg'}
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
