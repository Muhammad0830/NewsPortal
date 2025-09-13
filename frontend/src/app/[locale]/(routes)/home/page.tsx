"use client";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const t = useTranslations("Home");
  return <div className="text-[42px]">{t("title")}</div>;
};

export default Page;
