"use client";
import { Link } from "@/i18n/navigation";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const topNewsImages = [
  { url: "/images/news1.jpg", title: "Global Markets Rally Today" },
  {
    url: "/images/news2.jpg",
    title:
      "Local Sports Team Wins Championship and for the first time they have achieved something that they never had",
  },
  { url: "/images/news3.jpg", title: "Tech Giants Launch New AI Tool" },
  {
    url: "/images/news4.jpg",
    title:
      "New Environmental Policies Announced and here is what it is, it is named like a new ",
  },
  { url: "/images/news5.jpg", title: "Breakthrough in Renewable Energy" },
];

const categories = [
  {
    name: "Technology",
    category: "technology",
    description: "Latest trends in tech, gadgets, AI, and digital innovation.",
    color: "#BAE6FD", // sky-200
  },
  {
    name: "Sports",
    category: "sports",
    description: "Scores, highlights, and stories from global sports events.",
    color: "#FDE68A", // yellow-300
  },
  {
    name: "Environment",
    category: "environment",
    description: "News on climate change, nature, and sustainable living.",
    color: "#86EFAC", // green-300
  },
  {
    name: "Politics",
    category: "politics",
    description: "Updates on government, elections, and global policies.",
    color: "#D8B4FE", // purple-300
  },
  {
    name: "Health",
    category: "health",
    description: "Medical research, wellness tips, and healthcare news.",
    color: "#FDA4AF", // rose-300
  },
  {
    name: "Business",
    category: "business",
    description: "Markets, economy, startups, and corporate updates.",
    color: "#7DD3FC", // sky-300
  },
  {
    name: "Science",
    category: "science",
    description:
      "Discoveries, space exploration, and scientific breakthroughs.",
    color: "#A5B4FC", // indigo-300
  },
  {
    name: "World",
    category: "world",
    description: "International headlines and global affairs coverage.",
    color: "#FDBA74", // orange-300
  },
  {
    name: "Education",
    category: "education",
    description: "Learning, schools, universities, and education reforms.",
    color: "#5EEAD4", // teal-300
  },
  {
    name: "Entertainment",
    category: "entertainment",
    description: "Movies, TV shows, celebrities, and pop culture buzz.",
    color: "#F9A8D4", // pink-300
  },
  {
    name: "Travel",
    category: "travel",
    description: "Guides, destinations, and travel experiences worldwide.",
    color: "#FCD34D", // amber-300
  },
  {
    name: "Food",
    category: "food",
    description: "Recipes, culinary trends, and dining culture updates.",
    color: "#FDBA74", // orange-300
  },
  {
    name: "Fashion",
    category: "fashion",
    description:
      "Trends, designers, and style inspiration from around the world.",
    color: "#D1D5DB", // gray-300
  },
  {
    name: "Culture",
    category: "culture",
    description: "Art, literature, traditions, and cultural perspectives.",
    color: "#93C5FD", // blue-300
  },
  {
    name: "Opinion",
    category: "opinion",
    description: "Expert commentary, editorials, and personal viewpoints.",
    color: "#FCA5A5", // red-300
  },
];

const CARD_WIDTH = 30;
const GAP = 2;

const Page = () => {
  const t = useTranslations("Home");
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  const images = [...topNewsImages, ...topNewsImages];
  const speed = 1.5;

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
  }, [isPaused]);

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
                  src={img.url}
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
      <section className="flex flex-col gap-4 lg:mt-20 md:mt-10 mt-4 mb-4">
        <div className="lg:text-3xl md:text-xl text-lg font-semibold">
          {t("Category")}
        </div>
        <div className="border border-black/60 rounded-lg p-3 dark:border-white">
          <div className="lg:text-xl md:text-lg text-[16px] text-center w-full flex justify-center mb-4">
            {t("You can find any news of your interest here")}
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-4 md:gap-3 gap-2">
            {categories.map((categ, index) => {
              if (index >= 7) return null;

              return (
                <Link
                  className="px-2 py-0.5 rounded-sm text-black"
                  style={{
                    backgroundColor: categ.color,
                  }}
                  key={index}
                  href={`/news/${categ.category}`}
                >
                  <h5 className="text-lg font-semibold sm:text-start text-center">
                    {t(`${categ.name}`)}
                  </h5>
                  <p className="text-[16px] sm:flex hidden">
                    {t(`${categ.description}`)}
                  </p>
                </Link>
              );
            })}
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
