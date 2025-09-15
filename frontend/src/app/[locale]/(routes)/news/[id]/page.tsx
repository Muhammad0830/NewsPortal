"use client";
import useApiQuery from "@/hooks/useApiQiery";
import { News } from "@/types/types";
import { ArrowLeft, Link } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const id = params?.id;
  const t = useTranslations("News");
  const [news, setNews] = useState<News | null>(null);

  const { data: newsData, isLoading } = useApiQuery<News>(`/news/each/${id}`, [
    "EachNews",
  ]);

  useEffect(() => {
    if (newsData) setNews(newsData);
  }, [newsData]);

  // if (isLoading) return <div className="pt-20">Loading...</div>;

  // if (!id || !news)
  //   return <div className="pt-20">{t("No such news found")}</div>;

  const data = {
    mainTitle: "mainTitle",
    mainNewsText: "mainNewsText",
    mainImage: "/images/news1.jpg",
    contents: [
      { type: "title", content: "title1", order: 1 },
      {
        type: "newsText",
        content: "newsText1",
        order: 2,
      },
      {
        type: "image",
        content: [
          "/images/news1.jpg",
          "/images/news2.jpg",
          "/images/news2.jpg",
        ],
        order: 3,
      },
      {
        type: "title",
        content: "title2",
        order: 4,
      },
      {
        type: "image",
        content: ["/images/news3.jpg"],
        order: 7,
      },
      {
        type: "image",
        content: ["/images/news4.jpg"],
        order: 6,
      },
      { type: "link", content: "Read more", order: 5 },
      {
        type: "newsText",
        content: "newsText2",
        order: 8,
      },
    ],
  };

  const ordewredContents = data.contents.sort((a, b) => a.order - b.order);

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
      <div className="w-full mt-5 shadow-[0px_0px_30px_2px_#000000] rounded-md p-2">
        <div className="relative lg:min-w-[800px] sm:min-w-[500px] min-w-[200px] sm:w-[65vw] w-[100%] max-w-[600px] aspect-video mx-auto rounded-md overflow-hidden">
          <Image
            src={`/images/news${Number(id) + 1}.jpg`}
            alt="news"
            fill
            className="object-cover"
          />
        </div>
        <div className="sm:text-2xl text-xl font-bold">{data.mainTitle}</div>
        <div className="flex flex-col gap-2">
          {ordewredContents.map((c, index) => {
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
                  <div
                    className="text-primary flex gap-1 items-center"
                    key={index}
                  >
                    <Link className="sm:w-4 w-3.5 aspect-square" />
                    <span className="sm:text-[16px] text-sm">{c.content}</span>
                  </div>
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
                          alt={`news${c.order}`}
                          fill
                        />
                      </div>
                    );
                  } else if (c.content.length > 1 && Array.isArray(c.content)) {
                    console.log("c.content", c.content);
                    return (
                      <div className="flex flex-col items-center">
                        <div className="lg:max-w-[1200px] w-full sm:grid grid-cols-2 flex flex-col md:gap-4 ld:gap-6 gap-2">
                          {c.content.map((img, index) => (
                            <div
                              className="sm:w-auto w-[70vw] max-sm:mx-auto relative aspect-video overflow-hidden rounded-md"
                              key={index}
                            >
                              <Image
                                className="object-cover"
                                src={img}
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
