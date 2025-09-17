"use client";
import React from "react";
import { cn } from "@/lib/cn";
import DarkLightMode from "./DarkLightMode";
import LangAdminButton from "./LangAdminButton";
import MenuAdminButton from "./MenuAdminButton";

const AdminNavBar = ({
  open: openSidebar,
  setOpen: setOpenSideBar,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="relative">
      <div
        className={`fixed right-0 ${
          openSidebar ? "md:left-[16rem] left-0" : "left-0"
        } lg:h-[72px] md:h-[68px] h-[64px] px-4 py-2 flex gap-2 justify-between items-center backdrop-blur-md shadow-[0px_0px_15px_1px_#00000050] dark:shadow-[0px_0px_15px_1px_#ffffff50] z-[998] transition-all duration-300`}
      >
        {/* sidebar trigger button */}
        <div className="cursor-pointer border border-primary dark:border-primary/50 hover:bg-primary/30 rounded-sm md:flex hidden justify-center items-center overflow-hidden">
          <button
            onClick={() => setOpenSideBar((prev) => !prev)}
            className="cursor-pointer h-10 aspect-square rounded-md flex justify-center items-center"
          >
            <div className="relative border-[2px] rounded-[3px] w-3/5 aspect-square border-black dark:border-white overflow-hidden">
              <div className="absolute left-[20%] border-[1px] border-black dark:border-white top-0 bottom-0"></div>
            </div>
          </button>
        </div>
        <MenuAdminButton />

        {/* logo */}
        <div
          className={cn(
            "lg:text-[28px] sm:text-[24px] text-[18px] font-semibold transition-opacity duration-300",
            openSidebar ? "md:opacity-0" : "opacity-100"
          )}
        >
          News Portal Admins
        </div>

        {/* dark/light mode && language button */}
        <div className="flex gap-2 items-center">
          <DarkLightMode isUserPage={false} />
          <LangAdminButton />
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
