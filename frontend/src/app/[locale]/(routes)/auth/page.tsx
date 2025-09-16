"use client";
import { useAuth } from "@/context/authContext";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode") || "signup";
  const router = useRouter();
  const t = useTranslations("Auth");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customMode, setCustomMode] = useState<"signin" | "signup">(
    modeParam === "signin" ? "signin" : "signup"
  );
  const [role, setRole] = useState<"admin" | "user">("user");

  const { login, register, error, success, setError, setSuccess } = useAuth();

  useEffect(() => {
    if (error !== null) {
      toast(
        error === "login"
          ? "Failed to login"
          : error === "signup"
          ? "Failed to signup"
          : "Failed to Logout",
        {
          description:
            error === "login"
              ? "Please check your credentials and try again"
              : error === "signup"
              ? "Please try again"
              : "Internal server error",
        }
      );
      setError(null);
    }
  }, [error]); // eslint-disable-line

  useEffect(() => {
    if (success) {
      toast(
        success === "signup"
          ? "Successfully registered"
          : success === "login"
          ? "Successfully logged in"
          : "Successfully logged out",
        {
          description:
            success === "login"
              ? "Welcome back"
              : success === "signup"
              ? "Your journey begins here"
              : "Come back anytime",
        }
      );
      if (success === "signup" || success === "login") router.push("/home");
      setSuccess(null);
    }
  }, [success]); // eslint-disable-line

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email && password) {
      await register(name, email, password);
    } else {
      toast("Please fill all the fields");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      await login(email, password, role);
    } else {
      toast("Please fill all the fields");
    }
  };

  return (
    <div className="pt-20 min-h-screen w-screen overflow-hidden relative flex justify-center items-center lg:px-[60px] md:px-[40px] sm:px-[30px] px-[20px]">
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
        <form onSubmit={handleSignup} className="w-full flex flex-col gap-2">
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
                {t("sign in")}
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
          {role ? t("Sign In") : t("Sign In as Admin")}
        </div>

        <div className="text-center lg:text-[16px] text-sm font-semibold">
          {t("Welcome back")}
        </div>

        <div className="mt-2 text-sm text-center mb-2">
          {t("Enter your details below")}
        </div>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-2">
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
        <div className="absolute bottom-0 left-0 right-0 translate-y-[120%] flex flex-col gap-1">
          <div className="text-center font-semibold">{t("Sign in as:")}</div>
          <div className="relative flex justify-center">
            <div className="w-[200px] relative rounded-full border border-black dark:border-white flex overflow-hidden bg-white dark:bg-black">
              <button
                onClick={() => setRole("user")}
                className={cn(
                  "z-10 flex-1 h-full cursor-pointer rounded-full px-2 py-1 flex justify-center items-center font-semibold text-white transition-colors duration-300",
                  role === "user" ? "text-white" : "text-black dark:text-white"
                )}
              >
                User
              </button>
              <button
                onClick={() => setRole("admin")}
                className={cn(
                  "z-10 flex-1 h-full cursor-pointer rounded-full px-2 py-1 flex justify-center items-center font-semibold text-white transition-colors duration-300",
                  role === "admin" ? "text-white" : "text-black dark:text-white"
                )}
              >
                Admin
              </button>
              <div
                className={cn(
                  "absolute w-1/2 bg-primary h-full rounded-full px-2 py-1 flex justify-center items-center font-semibold text-white transition-left duration-300",
                  role === "user" ? "left-0" : "left-1/2"
                )}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
