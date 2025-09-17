"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Payment } from "@/types/types";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

const TableActionButton = ({ payment }: { payment: Payment }) => {
  const t = useTranslations("adminNews");
  const router = useRouter();

  const handleDelete = async (id: string) => {
    console.log("delete", id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 border border-primary bg-primary/10"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-black relative border border-primary"
      >
        <div className="absolute inset-0 bg-primary/10"></div>
        <DropdownMenuItem
          onClick={() => router.push(`/admin/news/${payment.id}`)}
          className="flex items-center gap-2 hover:!bg-primary/30"
        >
          <Eye />
          <span>{t("View")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push(`/admin/news/edit/${payment.id}`)}
          className="flex items-center gap-2 hover:!bg-primary/30"
        >
          <Pencil />
          <span>{t("Edit")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => handleDelete(payment.id)}
          className="flex items-center gap-2 hover:!bg-primary/30"
        >
          <Trash2 />
          <span>{t("Delete")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActionButton;
