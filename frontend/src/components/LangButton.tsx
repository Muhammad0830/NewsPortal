"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const languages = [
  { label: "English", locale: "en" },
  { label: "Русский", locale: "ru" },
  { label: "O'zbek", locale: "uz" },
];

const LangButton = () => {
  const t = useTranslations("NavBar");
  const pathName = usePathname();
  const currentPath = pathName.split("/")[2];
  const locale = pathName.split("/")[1];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="sm:w-10 w-8 aspect-square border rounded-full bg-black border-white/30 sm:p-1.5 p-1 cursor-pointer">
          <Globe className="w-full h-full" color="#fff" />
        </button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined} className="p-4 w-auto">
        <DialogTitle className="mr-8 text-nowrap">
          {t("Select Language")}
        </DialogTitle>
        <div className="flex flex-col sm:flex-row gap-2 items-start mt-2">
          {languages.map((lang, index) => (
            <Link
              className={cn(
                "w-full sm:w-auto border p-2 rounded-md border-black/60 dark:border-white/40 text-center",
                locale === lang.locale &&
                  "bg-black dark:bg-[#222222] text-white"
              )}
              key={index}
              href={`/${currentPath}`}
              locale={lang.locale}
            >
              {lang.label}
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LangButton;
