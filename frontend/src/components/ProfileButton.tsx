import { useAuth } from "@/context/authContext";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const ProfileButton = () => {
  const { user, logout, success, error, setSuccess, setError } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("NavBar");
  const openBtnRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (error === "logout") {
      toast("Failed to Logout", { description: "Please try again later" });
      setError(null);
    }
  }, [error]); // eslint-disable-line

  useEffect(() => {
    if (success === "logout") {
      toast("Successfull logged out", { description: "Come back anytime!" });
      setSuccess(null);
    }
  }, [success]); // eslint-disable-line

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openBtnRef.current &&
        !openBtnRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!user) return null;

  return (
    <div ref={openBtnRef} className="relative ">
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="sm:h-10 h-8 rounded-full flex justify-center items-center aspect-square border border-black/50 dark:border-white/50 cursor-pointer"
      >
        <User />
      </button>
      <div
        className={cn(
          "absolute lg:min-w-[200px] flex flex-col items-center p-2 origin-top-right opacity-0 scale-[0] top-[80%] right-2  rounded-md dark:bg-black bg-white border dark:border-white/30 border-black/50 transition-all duration-300 z-10",
          isOpen && "scale-[1] opacity-100 top-[120%] right-0"
        )}
      >
        <Link
          href={"/profile"}
          className="w-full flex cursor-pointer items-center gap-2 bg-[#adadad20] hover:bg-[#adadad60] dark:bg-[#1f1f1f70] dark:hover:bg-[#1f1f1f] mb-2 border dark:border-white/10 border-black/10 px-2 py-1 rounded-md"
        >
          <div className="h-4 aspect-square rounded-full flex justify-center items-center">
            {user.user.image ? (
              <div className="h-8 aspect-square rounded-full ">
                <Image src={user.user.image} alt="user image" />
              </div>
            ) : (
              <div className="h-8 aspect-square rounded-full border dark:border-white/40 border-black/60 flex justify-center items-center">
                <User className="w-[80%] aspect-square dark:text-white text-black" />
              </div>
            )}
          </div>
          <div>
            <div className="sm:text-[16px] text-start text-sm dark:text-white text-black font-bold">
              {user.user.name}
            </div>
            <div className="sm:text-sm text-start text-xs dark:text-white/70 text-black/80 font-semibold">
              {user.user.email}
            </div>
          </div>
        </Link>
        <ul className="flex flex-col w-full justify-start gap-1">
          <li className="text-start w-full flex flex-col">
            <Link
              className={cn(
                "group relative w-full text-nowrap dark:text-white text-black px-2 py-1 rounded-sm dark:hover:bg-[#272727] hover:bg-[#e1e1e1]"
              )}
              href="/profile"
            >
              {t("profile")}
              <span
                className={cn(
                  "absolute bottom-0 h-[2px] bg-primary rounded-full transition-all duration-300"
                )}
              ></span>
            </Link>
          </li>
          {user.user.role === "admin" && (
            <li className="text-start w-full flex flex-col">
              <Link
                href={"/admin"}
                className={cn(
                  "group relative text-start w-full text-nowrap dark:text-white text-black px-2 py-1 rounded-sm dark:hover:bg-[#272727] hover:bg-[#e1e1e1]"
                )}
              >
                {t("Admin")}
                <span
                  className={cn(
                    "absolute bottom-0 h-[2px] bg-primary rounded-full transition-all duration-300"
                  )}
                ></span>
              </Link>
            </li>
          )}
          <li className="text-start w-full flex flex-col">
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className={cn(
                    "group relative cursor-pointer text-start w-full text-nowrap dark:text-white text-black px-2 py-1 rounded-sm bg-[#ff2f2f] hover:bg-[#ff0000] dark:bg-[#ac0000] dark:hover:bg-[#ff0707]"
                  )}
                >
                  {t("Logout")}
                  <span
                    className={cn(
                      "absolute bottom-0 h-[2px] bg-primary rounded-full transition-all duration-300"
                    )}
                  ></span>
                </div>
              </DialogTrigger>
              <DialogContent
                aria-description="none"
                className="w-auto sm:p-4 p-2"
              >
                <DialogTitle className="md:pr-4 pr-6 lg:text-lg sm:text-[16px] text-sm font-semibold">
                  {t("Are you sure you want to logout")}
                </DialogTitle>
                <div className="flex justify-between gap-2 items-center">
                  <button
                    onClick={() => handleLogout()}
                    className="bg-[#ff0000] rounded-sm px-2 py-1 text-white cursor-pointer"
                  >
                    {t("Logout")}
                  </button>
                  <DialogClose asChild>
                    <button className="border border-black/40 dark:border-white/40 px-2 py-1 rounded-sm cursor-pointer">
                      {t("Cancel")}
                    </button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileButton;
