"use client";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const id = params?.id;
  return (
    <div className="text-black dark:text-white">
      <div className="">page {id}</div>
    </div>
  );
};

export default Page;
