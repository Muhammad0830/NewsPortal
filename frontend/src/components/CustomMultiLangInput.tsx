"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

type MultiLangInputProps = {
  values: { en: string; ru: string; uz: string };
  onChange: (values: { en: string; ru: string; uz: string }) => void;
  placeholderKey: string; // translation key like "enterTitle" or "enterDescription"
  className?: string; // input classes
  toggleClassName?: string; // toggle classes
  isTextArea?: boolean;
  wrapperClassName?: string;
};

export default function CustomMultiLangInput({
  values,
  onChange,
  placeholderKey,
  className,
  toggleClassName,
  wrapperClassName,
  isTextArea,
}: MultiLangInputProps) {
  const t = useTranslations("adminNews");

  // 👇 local active lang state (independent for each component)
  const [activeLang, setActiveLang] = useState<"en" | "ru" | "uz">("en");

  // map readable names
  const langNames: Record<"en" | "ru" | "uz", string> = {
    en: "English",
    ru: "Русский",
    uz: "O‘zbekcha",
  };

  const handleChange = (val: string) => {
    onChange({ ...values, [activeLang]: val });
  };

  return (
    <div className={`w-full ${wrapperClassName}`}>
      <ToggleGroup
        type="single"
        value={activeLang}
        onValueChange={(val) => val && setActiveLang(val as "en" | "ru" | "uz")}
      >
        {(["en", "ru", "uz"] as const).map((lang, i) => (
          <ToggleGroupItem
            key={lang}
            value={lang}
            aria-label={langNames[lang]}
            className={cn(
              "cursor-pointer lg:min-w-[100px] lg:text-sm text-xs min-w-[70px] border border-primary bg-primary/20 hover:bg-primary/40 dark:hover:bg-primary/10",
              i === 0 && "border-r-transparent",
              i === 1 && "border-x-transparent",
              i === 2 && "border-l-transparent",
              activeLang === lang && "bg-primary/40 dark:bg-primary/10",
              toggleClassName
            )}
          >
            {langNames[lang]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {isTextArea ? (
        <textarea
          className={cn(
            "w-full min-h-[80px] flex items-start justify-start text-start p-2",
            className
          )}
          placeholder={t(placeholderKey, { lang: langNames[activeLang] })}
          value={values[activeLang]}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className={cn(
            "w-full h-10 py-1 px-2 rounded-sm bg-primary/20 border border-primary",
            className
          )}
          placeholder={t(placeholderKey, { lang: langNames[activeLang] })}
          value={values[activeLang]}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
    </div>
  );
}
