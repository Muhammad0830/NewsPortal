import { useAuth } from "@/context/authContext";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

const ProfileButton = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("NavBar");

  if (!user) return null;

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="sm:h-10 h-8 relative rounded-full flex justify-center items-center aspect-square border border-black/50 dark:border-white/50 cursor-pointer"
    >
      <div>
        <User />
      </div>
      <div
        className={cn(
          "absolute lg:min-w-[200px] flex flex-col items-center p-2 origin-top-right opacity-0 scale-[0] top-[80%] right-2  rounded-md bg-black dark:bg-white border border-white/30 dark:border-black/50 transition-all duration-300 z-10",
          isOpen && "scale-[1] opacity-100 top-[120%] right-0"
        )}
      >
        <div className="w-full flex items-center gap-2 dark:bg-[#adadad60] dark:hover:bg-[#adadad90] bg-[#1f1f1f70] hover:bg-[#1f1f1f] mb-2 border border-white/10 dark:border-black/10 px-2 py-1 rounded-md">
          <div className="h-4 aspect-square rounded-full flex justify-center items-center">
            {user.user.image ? (
              <div className="h-8 aspect-square rounded-full ">
                <Image src={user.user.image} alt="user image" />
              </div>
            ) : (
              <div className="h-8 aspect-square rounded-full border border-white/40 dark:border-black/60 flex justify-center items-center">
                <User className="w-[80%] aspect-square text-white dark:text-black" />
              </div>
            )}
          </div>
          <div>
            <div className="sm:text-[16px] text-start text-sm text-white dark:text-black font-bold">
              {user.user.name}
            </div>
            <div className="sm:text-sm text-start text-xs text-white/70 dark:text-black/80 font-semibold">
              {user.user.email}
            </div>
          </div>
        </div>
        <ul className="flex flex-col w-full justify-start gap-2">
          <li className="text-start w-full flex flex-col">
            <Link
              className={cn(
                "group relative w-full text-nowrap text-white dark:text-black px-2 py-1 rounded-sm hover:bg-[#272727]"
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
        </ul>
      </div>
    </button>
  );
};

export default ProfileButton;
