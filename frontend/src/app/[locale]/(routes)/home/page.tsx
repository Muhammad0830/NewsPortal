"use client";
import useApiQuery from "@/hooks/useApiQiery";
import { Link } from "@/i18n/navigation";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { News, Category } from "@/types/types";
import { cn } from "@/lib/cn";

const CARD_WIDTH = 30;
const GAP = 2;

const Page = () => {
  const t = useTranslations("Home");
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [images, setImages] = useState<News[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const speed = 1.5;

  const { data, isLoading } = useApiQuery<News[]>("/news", ["news"]);
  const newsData = data?.filter((item, index) => index < 5) || [];

  const { data: categoriesData, isLoading: isCategoryLoading } = useApiQuery<
    Category[]
  >("/news/categories", ["category"]);

  useEffect(() => {
    setImages([...newsData, ...newsData]);
    if (categoriesData) setCategories(categoriesData);
  }, [data, categoriesData]); // eslint-disable-line

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    let animationFrame: number;
    let position = 0;

    const container = containerRef.current;
    if (!container) return;

    const handleVisibility = () => setIsPaused(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);

    const step = () => {
      if (!isPaused && container) {
        position += speed;
        const totalScrollWidth = container.scrollWidth / 2;
        if (position >= totalScrollWidth) {
          position -= totalScrollWidth;
        }
        container.style.transform = `translateX(-${position}px)`;
      }
      animationFrame = requestAnimationFrame(step);
    };

    step();

    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isPaused, containerRef.current]); // eslint-disable-line

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="lg:px-[60px] md:px-[40px] sm:px-[30px] px-[20px] relative overflow-hidden">
      {/* hero section */}
      <section className="relative h-screen">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="dark:text-white text-black text-3xl sm:text-5xl md:text-7xl font-bold sm:mb-4 mb-2">
            {t("Top News Portal")}
          </h1>
          <h2 className="dark:text-white text-black text-[16px] sm:text-lg md:text-2xl max-w-xl">
            {t("Stay updated with the latest news")}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:mt-6 mt-2">
            <button className="flex  items-center gap-2 px-1.5 pb-0.5 rounded-sm cursor-pointer border-[1px] font-semibold border-white dark:border-black text-white dark:text-black bg-black dark:bg-white">
              <span>{t("goto_news")}</span>
              <ExternalLink size={14} />
            </button>
          </div>
        </div>

        <div className="absolute left-0 h-22 bottom-[10%] hidden sm:flex justify-center items-center overflow-hidden w-3 ">
          <div className="absolute h-20 dark:shadow-[0px_0px_2px_1px_#ffffff50] shadow-[0px_0px_2px_1px_#00000050]">
            <div className="absolute dark:shadow-[0px_0px_3px_3px_#ffffff90] shadow-[0px_0px_3px_2px_#00000090] top-[-100%] h-3 animateshadows"></div>
            <div className="absolute dark:shadow-[0px_0px_3px_3px_#ffffff90] shadow-[0px_0px_3px_2px_#00000090] top-[-100%] h-3 animateshadows2"></div>
          </div>
        </div>

        <div className="absolute right-0 h-22 top-[20%] hidden sm:flex justify-center items-center overflow-hidden w-3 ">
          <div className="absolute h-20 dark:shadow-[0px_0px_2px_1px_#ffffff50] shadow-[0px_0px_2px_1px_#00000050]">
            <div className="absolute dark:shadow-[0px_0px_3px_3px_#ffffff90] shadow-[0px_0px_3px_2px_#00000090] top-[-100%] h-3 animateshadows3"></div>
            <div className="absolute dark:shadow-[0px_0px_3px_3px_#ffffff90] shadow-[0px_0px_3px_2px_#00000090] top-[-100%] h-3 animateshadows4"></div>
          </div>
        </div>
      </section>

      {/* top news section */}
      <section className="relative flex flex-col items-start justify-center">
        <div className="text-black dark:text-white mb-4 w-full flex justify-between sm:items-end items-center">
          <span className="lg:text-3xl md:text-xl text-lg font-semibold">
            {t("Latest Top News")}
          </span>
          <Link
            href={"/news"}
            className="text-primary font-semibold md:text-[16px] text-sm"
          >
            {t("See more")}
          </Link>
        </div>
        <div className="relative flex flex-col items-center justify-center w-[400px]">
          <div
            ref={containerRef}
            className="flex"
            style={{
              gap: `${GAP}%`,
              width: `${
                images.length * (width > 640 ? CARD_WIDTH : 15) +
                (images.length - 1) * GAP
              }%`,
            }}
          >
            {images.map((img, index) => (
              <Link
                href={`/news/${index}`}
                key={index}
                className="group relative flex-shrink-0 aspect-video cursor-pointer border rounded-lg overflow-hidden border-black dark:border-white sacle-[1]"
                style={{
                  width: `${CARD_WIDTH}%`,
                }}
              >
                <Image
                  src={`/images/news${index + 1}.jpg`}
                  alt="news"
                  fill
                  className="object-cover group-hover:scale-[1.1] transition-scale duration-300"
                />
                <div className="absolute z-20 bottom-0 left-0 right-0 text-white p-2">
                  <span className="lg:text-xl md:text-lg sm:text-[16px] text-sm font-semibold line-clamp-2">
                    {img.title}
                  </span>
                </div>
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1))",
                  }}
                ></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* categories section */}
      <section
        className={cn(
          "flex-col gap-4 lg:mt-20 md:mt-10 mt-4 mb-4",
          !categories || categories.length <= 0 ? "hidden" : "flex"
        )}
      >
        <div className="lg:text-3xl md:text-xl text-lg font-semibold">
          {t("Category")}
        </div>
        <div className="border border-black/60 rounded-lg p-3 dark:border-white">
          <div className="lg:text-xl md:text-lg text-[16px] text-center w-full flex justify-center mb-4">
            {t("You can find any news of your interest here")}
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-4 md:gap-3 gap-2">
            {isCategoryLoading ? (
              <div>Loading the categories data...</div>
            ) : (
              categories?.map((categ, index) => {
                if (index >= 7) return null;

                return (
                  <Link
                    className="px-2 py-0.5 rounded-sm text-black"
                    style={{
                      backgroundColor: categ.color,
                    }}
                    key={index}
                    href={`/news?category=${categ.category}`}
                  >
                    <h5 className="text-lg font-semibold sm:text-start text-center">
                      {t(`${categ.name}`)}
                    </h5>
                    <p className="text-[16px] sm:flex hidden">
                      {t(`${categ.description}`)}
                    </p>
                  </Link>
                );
              })
            )}
            <Link
              className="px-2 py-0.5 rounded-sm text-black flex items-center justify-center gap-2"
              style={{
                backgroundColor: "var(--primary)",
              }}
              href={`/categories`}
            >
              <p className="md:text-xl text-[16px] font-semibold">
                <span className="hidden sm:flex">{t("More categories")}</span>
                <span className="sm:hidden flex">{t("More")}</span>
              </p>
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
