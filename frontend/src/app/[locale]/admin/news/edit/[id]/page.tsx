"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import React, { useEffect, useState } from "react";
import {
  SecondaryContent,
  ContentAdder,
  RequestNews,
  NewsResponse,
} from "@/types/types";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";
import { useEdgeStore } from "@/lib/edgestore";
import { useParams } from "next/navigation";
import useApiQuery from "@/hooks/useApiQiery";
import ImageUploader from "@/components/CustomUploader";

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

type insertResponse = {
  insertId: number;
};

const Page = () => {
  const params = useParams();
  const id = params?.id;
  const [secondaryContent, setSecondaryContent] = useState<SecondaryContent[]>(
    []
  );
  const [mainTitle, setMainTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [publishORSubmit, setPublishORSubmit] = useState<"publish" | "submit">(
    "submit"
  );
  const [mainUrls, setMainUrls] = useState<{
    url: string;
    thumbnailUrl: string;
  }>();
  const [secondaryUrls, setSecondaryUrls] = useState<{ url: string }[]>([]);
  const [responseStatus, setResponseStatus] = useState<
    "Published" | "Unpublished"
  >("Published");

  const t = useTranslations("adminNews");
  const router = useRouter();
  const { edgestore } = useEdgeStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mainTitle || !description || !mainUrls?.url || !slug) {
      toast(t("Action Denied"), {
        description: t("Fill all the necessary fields"),
      });
      return;
    }

    mutateNews(
      {
        id: Number(id),
        title: mainTitle,
        description: description,
        status: publishORSubmit === "publish" ? "published" : "unpublished",
        image: mainUrls?.url,
        redirectLink: link,
        slug: slug,
        contents: secondaryContent,
      },
      {
        onSuccess: async () => {
          toast(t("News created successfully"));
          setMainTitle("");
          setDescription("");
          setSlug("");
          setLink("");
          setSecondaryContent([]);

          await edgestore.PublicImages.confirmUpload({
            url: mainUrls?.url ? mainUrls.url : "",
          });

          secondaryUrls.forEach(async (url) => {
            await edgestore.PublicImages.confirmUpload({
              url: url.url,
            });
          });
          setMainUrls({ url: "", thumbnailUrl: "" });
          setSecondaryUrls([]);
          router.push("/admin/news");
        },
        onError: (error) => {
          toast(t("Action Failed"), {
            description: t("Internal Server Error"),
          });
          console.error(error);
        },
      }
    );
  };

  const { data: newsData, isLoading } = useApiQuery<NewsResponse>(
    `/news/each/${id}`,
    ["EachNews"]
  );

  useEffect(() => {
    if (newsData) {
      setMainTitle(newsData.mainTitle);
      setDescription(newsData.description);
      setSlug(newsData.slug);
      if (newsData.redirectLink) setLink(newsData.redirectLink);
      setMainUrls({
        url: newsData.mainImage,
        thumbnailUrl: newsData.mainImage,
      });
      if (newsData.status) setResponseStatus(newsData.status);
      setSecondaryContent(
        newsData.contents.map((content) =>
          content.type === "newsText" ? { ...content, type: "text" } : content
        )
      );
    }
  }, [newsData]);

  const { mutate: mutateNews } = useApiMutation<insertResponse, RequestNews>(
    "/news/update",
    "put"
  );

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

  if (isLoading)
    return <div className="text-black dark:text-white">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-3 mt-2">
        <div className="lg:text-3xl md:text-xl text-lg font-bold">
          {t("Edit News")}
        </div>
        <Button
          onClick={() => router.push("/admin/news")}
          className="cursor-pointer text-black dark:text-white border border-primary bg-primary/40 dark:bg-primary/20 hover:bg-primary/50 dark:hover:bg-primary/10"
        >
          {t("Back")}
        </Button>
      </div>

      <form
        id="submitForm"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mb-2"
      >
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
            <div className="relative inline-block">
              <ImageUploader
                images={
                  (mainUrls?.url as string) ? ([mainUrls?.url] as string[]) : []
                }
                onChange={(image) =>
                  setMainUrls({
                    url: image[0],
                    thumbnailUrl: image[0],
                  })
                }
                multiple={false}
              />
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
              <span className="block lg:hidden">{t("secondary")}</span>
              <span className="lg:block hidden">{t("secondary content")}</span>
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
                          content:
                            content.type === "link"
                              ? ({} as { label: string; url: string })
                              : content.type === "image"
                              ? ([] as string[])
                              : "",
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
                const label =
                  typeof content.content == "object" &&
                  "label" in content.content
                    ? content.content.label
                    : "";
                const url =
                  typeof content.content == "object" && "url" in content.content
                    ? content.content.url
                    : "";
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
                    {content.type === "title" || content.type === "text" ? (
                      <div className="w-full bg-primary/20 border border-primary rounded-sm">
                        <textarea
                          className="w-full min-h-[80px] flex items-start justify-start text-start  p-2"
                          placeholder={t(`Block: ${content.type}`)}
                          value={content.content as string}
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
                    ) : content.type === "link" ? (
                      <div className="flex sm:flex-row flex-col gap-2">
                        <div className="sm:w-1/2 w-full bg-primary/20 border border-primary rounded-sm">
                          <input
                            type="text"
                            className="w-full min-h-[40px] p-2"
                            placeholder={t(`Link url`)}
                            value={label}
                            onChange={(e) => {
                              setSecondaryContent((prev) =>
                                prev.map((item, index) =>
                                  index === content.order - 1 &&
                                  typeof item.content === "object"
                                    ? {
                                        ...item,
                                        content: {
                                          ...item.content,
                                          label: e.target.value,
                                        },
                                      }
                                    : item
                                )
                              );
                            }}
                          />
                        </div>
                        <div className="sm:w-1/2 w-full bg-primary/20 border border-primary rounded-sm">
                          <input
                            type="text"
                            className="w-full min-h-[40px] p-2"
                            placeholder={t(`Link name`)}
                            value={url}
                            onChange={(e) => {
                              setSecondaryContent((prev) =>
                                prev.map((item, index) =>
                                  index === content.order - 1 &&
                                  typeof item.content === "object"
                                    ? {
                                        ...item,
                                        content: {
                                          ...item.content,
                                          url: e.target.value,
                                        },
                                      }
                                    : item
                                )
                              );
                            }}
                          />
                        </div>
                      </div>
                    ) : content.type === "image" ? (
                      <div className="min-h-[80px] w-full relative cursor-pointer">
                        <ImageUploader
                          images={
                            secondaryContent
                              .filter(
                                (item) =>
                                  item.type === "image" &&
                                  item.order === content.order
                              )
                              .map((content) => content.content as string[])[0]
                          }
                          onChange={(images) =>
                            setSecondaryContent((prev) =>
                              prev.map((item, index) =>
                                index === content.order - 1 &&
                                Array.isArray(item.content)
                                  ? {
                                      ...item,
                                      content: images,
                                    }
                                  : item
                              )
                            )
                          }
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

        <div className="w-full flex sm:flex-row flex-col justify-between gap-2">
          <div className="flex flex-col text-sm font-semibold text-black/70 dark:text-white/50 sm:order-1 order-2 sm:text-start text-center">
            <span>
              <span className="text-black dark:text-white">
                {t("Submit button_")}
              </span>{" "}
              {t("only submits without publishing")}
            </span>
            <span>
              <span className="text-black dark:text-white">
                {t("Publish button_")}
              </span>{" "}
              {t("both submits and publishes")}
            </span>
          </div>
          <div className="flex items-center sm:justify-end justify-center gap-2 sm:order-2 order-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  className="rounded-sm cursor-pointer"
                  onClick={() => setPublishORSubmit("publish")}
                  disabled={
                    !mainTitle ||
                    !description ||
                    !mainUrls?.url ||
                    !link ||
                    !slug
                  }
                >
                  {t("Publish")}
                </Button>
              </DialogTrigger>
              {responseStatus === "Published" ? null : (
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    className="rounded-sm cursor-pointer"
                    onClick={() => setPublishORSubmit("submit")}
                    disabled={
                      !mainTitle ||
                      !description ||
                      !mainUrls?.url ||
                      !link ||
                      !slug
                    }
                  >
                    {t("Submit")}
                  </Button>
                </DialogTrigger>
              )}
              <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000]" />
              <DialogContent
                aria-description="form values"
                className="md:min-w-[700px] w-[80vw] md:max-w-auto !max-w-[500px] z-[10001] sm:p-4 p-2"
              >
                <DialogTitle className="lg:text-2xl sm:text-xl text-lg font-semibold">
                  {t("Form Values")}
                </DialogTitle>
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
                              <span className="font-semibold">{t("Slug")}</span>
                              : {slug}
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
                              {mainUrls?.url ? (
                                <Image
                                  src={mainUrls?.url}
                                  alt="image"
                                  fill
                                  className="object-cover"
                                />
                              ) : null}
                            </div>
                          </button>
                        </DialogTrigger>
                        <DialogContent
                          aria-description="image"
                          className="z-[10002] sm:p-4 p-2 !max-w-[80vw] w-auto min-w-auto max-h-[80vw] flex flex-col"
                        >
                          <DialogTitle>{t("Image")}</DialogTitle>
                          <div className="relative w-auto">
                            {mainUrls?.url ? (
                              <img // eslint-disable-line
                                src={mainUrls?.url}
                                alt="image"
                                className="w-auto h-auto"
                              />
                            ) : null}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <div className="flex justify-end w-full">
                    <DialogClose asChild>
                      <button
                        onClick={() => {}}
                        type="submit"
                        className="rounded-sm cursor-pointer border border-primary px-2 py-1 bg-primary/50 dark:bg-primary/30 hover:bg-primary/70 dark:hover:bg-primary/10 text-black dark:text-white"
                        form="submitForm"
                      >
                        {publishORSubmit === "submit"
                          ? t("Submit")
                          : t("Publish")}
                      </button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
