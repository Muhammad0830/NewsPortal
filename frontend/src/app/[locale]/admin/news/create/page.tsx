"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import {
  ArrowDown,
  ArrowUp,
  Images,
  Link2,
  Plus,
  Trash2,
  Type,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

interface ContentAdder {
  type: "title" | "text" | "image" | "link";
  label: string;
  icon: React.ReactNode;
}

const contentAdders: ContentAdder[] = [
  {
    type: "title",
    label: "Title",
    icon: <Type className="w-4 h-4" />,
  },
  {
    type: "text",
    label: "Text",
    icon: <Type className="w-4 h-4" />,
  },
  {
    type: "image",
    label: "Image",
    icon: <Images className="w-4 h-4" />,
  },
  {
    type: "link",
    label: "Link",
    icon: <Link2 className="w-4 h-4" />,
  },
];

interface SecondaryContent {
  type: "title" | "text" | "image" | "link";
  content: string;
  order: number;
}

const Page = () => {
  const [secondaryContent, setSecondaryContent] = useState<SecondaryContent[]>(
    []
  );
  const [mainTitle, setMainTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const t = useTranslations("adminNews");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const moveItem = (order: number, direction: "up" | "down") => {
    setSecondaryContent((prev) => {
      const index = order - 1;
      const newArray = [...prev];

      if (direction === "up" && index === 0) return prev;
      if (direction === "down" && index === newArray.length - 1) return prev;

      const swapIndex = direction === "up" ? index - 1 : index + 1;

      [newArray[index], newArray[swapIndex]] = [
        newArray[swapIndex],
        newArray[index],
      ];

      return newArray.map((item, id) => ({
        ...item,
        order: id + 1,
      }));
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-4 mt-2">
        <div className="lg:text-3xl md:text-xl text-lg font-bold">
          {t("Create News")}
        </div>
        <Button
          onClick={() => router.push("/admin/news")}
          className="cursor-pointer text-black dark:text-white border border-primary bg-primary/40 dark:bg-primary/20 hover:bg-primary/50 dark:hover:bg-primary/10"
        >
          {t("Back")}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
        <div className="flex flex-col gap-2 p-2 border border-primary rounded-sm">
          <div className="lg:text-xl text-lg font-semibold sm:text-start text-center">
            {t("Main content")}
          </div>
          <div className="flex sm:flex-row flex-col items-center gap-2">
            <div className="sm:w-1/2 w-full">
              <div>{t("Slug")}*</div>
              <div className="w-full h-10">
                <input
                  type="text"
                  className="w-full h-full py-1 px-2 rounded-sm bg-primary/20 border border-primary"
                  placeholder={t("slug for example")}
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-1/2 w-full">
              <div>
                {t("redirectURL")} {t("optional")}
              </div>
              <div className="w-full h-10">
                <input
                  type="text"
                  className="w-full h-full py-1 px-2 rounded-sm bg-primary/20 border border-primary"
                  placeholder={t("redirect for example")}
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <div>{t("image")}*</div>
            <div className="relative h-10 w-1/3 cursor-pointer">
              <div className="absolute cursor-pointer inset-0 dark:bg-black bg-white border border-primary rounded-sm flex items-center justify-start  z-0 px-2 py-1">
                <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-sm"></div>
                {t("select an image")}
              </div>
              <input
                type="file"
                className="opacity-0 w-full z-10 h-full relative cursor-pointer"
                onChange={handleFileChange}
              />
              {/* to prevent image from being loaded | now it starts loading instantly after the upload */}
              {image ? (
                <div className="w-0 h-0 opacity-0">
                  <Image
                    src={image}
                    alt="image"
                    className="object-cover"
                    fill
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex sm:flex-row flex-col items-center gap-2">
            <div className="sm:w-1/2 w-full">
              <div>{t("Title")}*</div>
              <div className="w-full h-10">
                <input
                  type="text"
                  className="w-full h-full py-1 px-2 rounded-sm bg-primary/20 border border-primary"
                  placeholder={t("title for example")}
                  value={mainTitle}
                  onChange={(e) => setMainTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-1/2 w-full">
              <div>{t("Description")}*</div>
              <div className="w-full h-10">
                <input
                  type="text"
                  className="w-full h-full py-1 px-2 rounded-sm bg-primary/20 border border-primary"
                  placeholder={t("description for example")}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2 border border-primary rounded-sm">
          <div className="flex sm:flex-row flex-col items-center gap-2 justify-between">
            <div className="lg:text-xl text-lg font-semibold">
              {t("secondary content")}
            </div>
            <div className="flex items-center gap-2 justify-end">
              <div className="py-1 sm:block hidden">
                <Plus className="w-5 h-5" />
              </div>
              {contentAdders.map((content, index) => {
                return (
                  <button
                    type="button"
                    key={index}
                    onClick={() => {
                      setSecondaryContent((prev) => [
                        ...prev,
                        {
                          type: content.type,
                          order: prev.length + 1,
                          content: "",
                        },
                      ]);
                    }}
                    className="flex gap-1 items-center border px-2 py-1 rounded-sm cursor-pointer bg-primary/40 hover:bg-primary/50 dark:bg-primary/20 border-primary dark:hover:bg-primary/10"
                  >
                    {content.icon}
                    <span className="sm:text-[16px] text-sm">
                      {t(`${content.label}`)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full min-h-[100px] p-1 rounded-sm border-2 border-dashed border-primary relative flex flex-col gap-2">
            {secondaryContent.length === 0 ? (
              <div className="absolute inset-0 flex justify-center items-center text-lg font-semibold">
                {t("No secondary content added")}
              </div>
            ) : (
              secondaryContent.map((content, index) => {
                return (
                  <div
                    key={index}
                    className="min-h-[80px] border border-primary rounded-sm bg-primary/20 dark:bg-primary/10 p-2"
                  >
                    <div className="flex items-center gap-2 justify-between pb-2">
                      <div className="lg:text-xl text-lg sm:flex hidden font-semibold">
                        {t(`Block: ${content.type}`)}
                      </div>
                      <div className="lg:text-xl text-lg sm:hidden flex font-semibold">
                        {t(`${content.type}`)}
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          type="button"
                          className={cn(
                            "p-1 rounded-sm border cursor-pointer bg-primary/40 dark:bg-primary/20 border-primary",
                            content.order === 1
                              ? "opacity-50 cursor-default"
                              : "hover:bg-primary/50 dark:hover:bg-primary/10"
                          )}
                          disabled={content.order === 1}
                          onClick={() => moveItem(content.order, "up")}
                        >
                          <ArrowUp className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          disabled={content.order === secondaryContent.length}
                          className={cn(
                            "p-1 rounded-sm border cursor-pointer bg-primary/40 dark:bg-primary/20 border-primary",
                            content.order === secondaryContent.length
                              ? "opacity-50 cursor-default"
                              : "hover:bg-primary/50 dark:hover:bg-primary/10"
                          )}
                          onClick={() => moveItem(content.order, "down")}
                        >
                          <ArrowDown className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSecondaryContent((prev) =>
                              prev
                                .filter((item) => item.order !== content.order)
                                .map((item, index) => ({
                                  ...item,
                                  order: index + 1,
                                }))
                            );
                          }}
                          className="p-1 rounded-sm border border-primary cursor-pointer bg-red-500 hover:bg-red-600 text-white"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    {content.type !== "image" ? (
                      <div className="w-full bg-primary/20 border border-primary rounded-sm">
                        {content.type !== "link" ? (
                          <textarea
                            className="w-full min-h-[80px] flex items-start justify-start text-start  p-2"
                            placeholder={t(`Block: ${content.type}`)}
                            value={content.content}
                            onChange={(e) => {
                              setSecondaryContent((prev) =>
                                prev.map((item, index) =>
                                  index === content.order - 1
                                    ? {
                                        ...item,
                                        content: e.target.value,
                                      }
                                    : item
                                )
                              );
                            }}
                          />
                        ) : (
                          <input
                            type="text"
                            className="w-full min-h-[40px] p-2"
                            placeholder={t(`Block: ${content.type}`)}
                            value={content.content}
                            onChange={(e) => {
                              setSecondaryContent((prev) =>
                                prev.map((item, index) =>
                                  index === content.order - 1
                                    ? {
                                        ...item,
                                        content: e.target.value,
                                      }
                                    : item
                                )
                              );
                            }}
                          />
                        )}
                      </div>
                    ) : content.type === "image" ? (
                      <div className="min-h-[80px] w-[120px] relative h-10 cursor-pointer">
                        <div className="absolute cursor-pointer inset-0 dark:bg-black bg-white border border-primary rounded-sm flex items-center justify-start  z-0 px-2 py-1">
                          <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 rounded-sm"></div>
                          {t("select an image")}
                        </div>
                        <input
                          type="file"
                          className="opacity-0 w-full z-10 h-full relative cursor-pointer"
                          value={content.content}
                          onChange={(e) => {
                            setSecondaryContent((prev) =>
                              prev.map((item, index) =>
                                index === content.order - 1
                                  ? {
                                      ...item,
                                      content: e.target.value,
                                    }
                                  : item
                              )
                            );
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-[40px] w-full flex justify-center items-center">
                        {t("Not supported type of content")}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                className="rounded-sm cursor-pointer"
                disabled={
                  !mainTitle || !description || !image || !link || !slug
                }
              >
                {t("Submit")}
              </Button>
            </DialogTrigger>
            <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]" />
            <DialogContent
              aria-description="form values"
              className="md:min-w-[700px] w-[80vw] md:max-w-auto !max-w-[500px] z-[10001] sm:p-4 p-2"
            >
              <DialogTitle>Form Values</DialogTitle>
              <div className="w-full flex flex-col gap-2">
                <div className="p-2 rounded-md border border-primary flex flex-col justify-between gap-2 relative min-h-[145px]">
                  <div className="lg:text-xl text-lg font-bold">
                    {t("Main content")}
                  </div>
                  <div className="flex sm:flex-row flex-col justify-between gap-2">
                    <div className="flex flex-col gap-2 w-[80%] sm:max-w-[calc(100%-130px)]">
                      <div>
                        <span className="px-2 py-0.5 rounded-sm bg-primary/40 dark:bg-primary/20">
                          <span className="font-semibold">{t("Title")}</span>:{" "}
                          {mainTitle}
                        </span>
                      </div>
                      <div>
                        <span className="px-2 py-0.5 rounded-sm bg-primary/40 dark:bg-primary/20">
                          <span className="font-semibold">
                            {t("Description")}
                          </span>
                          : {description}
                        </span>
                      </div>
                      <div className="flex sm:flex-row flex-col gap-2 sm:items-center">
                        <div>
                          <span className="px-2 py-0.5 rounded-sm bg-primary/40 dark:bg-primary/20">
                            <span className="font-semibold">{t("Slug")}</span>:{" "}
                            {slug}
                          </span>
                        </div>
                        <div>
                          <span className="px-2 py-0.5 rounded-sm bg-primary/40 dark:bg-primary/20">
                            <span className="font-semibold">
                              {t("redirectURL")}
                            </span>
                            : {link}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="sm:absolute relative sm:top-2 sm:right-2 flex flex-col gap-2 items-start justify-center w-full sm:w-[127px] sm:cursor-pointer">
                          <div className="absolute top-2 left-2 sm:px-1 px-2 sm:py-0 py-0.5 sm:rounded-xs rounded-sm sm:border border-primary bg-white dark:bg-black overflow-hidden z-10 sm:h-[18px] flex items-center">
                            <div className="absolute inset-0 sm:bg-primary/70 bg-primary/40 dark:bg-primary/20"></div>
                            <span className="relative z-10 text-sm font-semibold">
                              {t("image")}
                            </span>
                          </div>
                          <div className="z-1 w-full sm:aspect-square sm:h-auto h-[200px] max-[400px]:h-[150px] border border-primary rounded-sm overflow-hidden relative cursor-pointer">
                            <Image
                              src={image}
                              alt="image"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="z-[10002] sm:p-4 p-2 !max-w-[80vw] w-auto min-w-auto max-h-[80vw] flex flex-col">
                        <DialogTitle>{t("Image")}</DialogTitle>
                        <div className="relative w-auto">
                          <img // eslint-disable-line
                            src={image}
                            alt="image"
                            className="w-auto h-auto"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  );
};

export default Page;
