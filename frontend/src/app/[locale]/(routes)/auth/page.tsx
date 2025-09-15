"use client";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const modeParam = params?.mode;
  const [mode, setMode] = useState<"signin" | "signup">(
    modeParam === "signin" ? "signin" : "signup"
  );
  const t = useTranslations("Auth");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customMode, setCustomMode] = useState<"signin" | "signup">(
    modeParam === "signin" ? "signin" : "signup"
  );

  useEffect(() => {
    if (modeParam === "signup") setMode("signup");
    if (modeParam === "signin") setMode("signin");
  }, [modeParam]);

  console.log("mode", mode);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
  };

  return (
    <div className="pt-20 min-h-screen flex justify-center items-center lg:px-[60px] md:px-[40px] sm:px-[30px] px-[20px]">
      {/* sign up */}
      <div
        className={cn(
          "realtive rounded-md sm:min-w-[300px] min-w-[250px]  border border-black/50 dark:border-white/50 p-2 bg-[#e9e9e9] dark:bg-[#151515] transition-all duration-500 z-10",
          customMode === "signin"
            ? "opacity-0 -translate-x-[150%]"
            : "opacity-100 -translate-x-[0%]"
        )}
      >
        <div className="lg:text-xl text-center md:text-lg text-[16px] font-semibold">
          {t("Sign Up")}
        </div>

        <div className="text-center lg:text-[16px] text-sm font-semibold">
          {t("Create an account to access all features")}
        </div>

        <div className="mt-2 text-sm text-center mb-2">
          {t("Enter your details below")}
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
          <div className="border border-primary rounded-sm overflow-hidden">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="w-full h-full p-2"
              placeholder={t("Name")}
            />
          </div>
          <div className="border border-primary rounded-sm overflow-hidden">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              className="w-full h-full p-2"
              placeholder={t("Email")}
            />
          </div>
          <div className="border border-primary rounded-sm overflow-hidden">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="text"
              className="w-full h-full p-2"
              placeholder={t("Password")}
              security="true"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
            <button
              type="submit"
              className="flex justify-center items-center border border-black/50 dark:border-white/50 cursor-pointer bg-primary px-2 py-1 rounded-sm text-white flex-1 w-full sm:w-auto"
            >
              {t("Register")}
            </button>
          </div>
          <div className="text-center flex gap-2 items-center justify-center">
            {t("Already have an Account?")}
            <Link
              onClick={() => {
                setCustomMode("signin");
              }}
              href={`/auth?mode=signin`}
            >
              <span className="text-primary font-semibold underline">
                {t("sign up")}
              </span>
            </Link>
          </div>
        </form>
      </div>

      {/* sign in */}
      <div
        className={cn(
          "absolute rounded-md sm:min-w-[300px] min-w-[250px]  border border-black/50 dark:border-white/50 p-2 bg-[#e9e9e9] dark:bg-[#151515] transition-all duration-500 z-10",
          customMode === "signin"
            ? "opacity-100 translate-x-[0%]"
            : "opacity-0 translate-x-[150%]"
        )}
      >
        <div className="lg:text-xl text-center md:text-lg text-[16px] font-semibold">
          {t("Sign In")}
        </div>

        <div className="text-center lg:text-[16px] text-sm font-semibold">
          {t("Welcome back")}
        </div>

        <div className="mt-2 text-sm text-center mb-2">
          {t("Enter your details below")}
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
          <div className="border border-primary rounded-sm overflow-hidden">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              className="w-full h-full p-2"
              placeholder={t("Email")}
            />
          </div>
          <div className="border border-primary rounded-sm overflow-hidden">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="text"
              className="w-full h-full p-2"
              placeholder={t("Password")}
              security="true"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
            <button
              type="submit"
              className="flex justify-center items-center border border-black/50 dark:border-white/50 cursor-pointer bg-primary px-2 py-1 rounded-sm text-white flex-1 w-full sm:w-auto"
            >
              {t("Login")}
            </button>
          </div>
          <div className="text-center flex gap-2 items-center justify-center">
            {t("Don't have an Account")}
            <Link
              onClick={() => {
                setCustomMode("signup");
              }}
              href={`/auth?mode=signup`}
            >
              <span className="text-primary font-semibold underline">
                {t("sign up")}
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
