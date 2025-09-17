import { Link } from "@/i18n/navigation";
import React from "react";

const Page = () => {
  const navLists = [
    {
      label: "News",
      href: "/admin/news",
    },
    {
      label: "Admins",
      href: "/admin/admins",
    },
    {
      label: "Users",
      href: "/admin/users",
    },
  ];

  return (
    <div className="">
      <div className="lg:text-3xl md:text-2xl text-lg font-bold mb-4">
        Dashboard
      </div>
      <div className="flex flex-wrap md:gap-2 sm:gap-3 gap-2 items-center">
        {navLists.map((item, index) => {
          return (
            <Link
              href={`/${item.href}`}
              key={index}
              className="min-w-[15vw] bg-primary/20 text-black dark:text-white"
            >
              <div className="text-lg font-bold w-full h-full px-2 py-1.5 rounded-sm border border-primary/70 bg-primary/10 hover:bg-primary/60 cursor-pointer">
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
