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
import { CirclePlus, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { News } from "@/types/types";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";

const TableActionButton = ({
  payment,
  refetch,
}: {
  payment: News;
  refetch: () => void;
}) => {
  const t = useTranslations("adminNews");
  const router = useRouter();

  const handleDelete = async (id: number) => {
    deleteNews(id, {
      onSuccess: () => {
        toast(t("News deleted successfully"));
        refetch();
      },
      onError: (error) => {
        toast(t("Action Failed"), {
          description: t("Internal Server Error"),
        });
        console.error(error);
      },
    });
  };

  const { mutate: deleteNews } = useApiMutation(
    (id) => `/news/delete/${id}`,
    "delete"
  );

  const handlePublish = async (id: number) => {
    publish(
      { id },
      {
        onSuccess: () => {
          toast(t("News published successfully"));
          refetch();
        },
        onError: (error) => {
          toast(t("Action Failed"), {
            description: t("Internal Server Error"),
          });
          console.error(error);
        },
      }
    );
  };

  const handleUnPublish = async (id: number) => {
    unpublish(
      { id },
      {
        onSuccess: () => {
          toast(t("News unpublished successfully"));
          refetch();
        },
        onError: (error) => {
          toast(t("Action Failed"), {
            description: t("Internal Server Error"),
          });
          console.error(error);
        },
      }
    );
  };

  const { mutate: publish } = useApiMutation<{ id: number }, { id: number }>(
    "/news/publish",
    "put"
  );

  const { mutate: unpublish } = useApiMutation<{ id: number }, { id: number }>(
    "/news/unpublish",
    "put"
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 border border-primary bg-primary/10 cursor-pointer"
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
          className="flex items-center gap-2 hover:!bg-primary/30 cursor-pointer"
        >
          <Eye />
          <span>{t("View")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push(`/admin/news/edit/${payment.id}`)}
          className="flex items-center gap-2 hover:!bg-primary/30 cursor-pointer"
        >
          <Pencil />
          <span>{t("Edit")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => handleDelete(payment.id)}
          className="flex items-center gap-2 hover:!bg-primary/30 cursor-pointer"
        >
          <Trash2 />
          <span>{t("Delete")}</span>
        </DropdownMenuItem>
        {payment.status === "Unpublished" ? (
          <DropdownMenuItem
            onClick={() => handlePublish(payment.id)}
            className="flex items-center gap-2 hover:!bg-primary/30 cursor-pointer"
          >
            <CirclePlus />
            <span>{t("Publish")}</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => handleUnPublish(payment.id)}
            className="flex items-center gap-2 hover:!bg-primary/30 cursor-pointer"
          >
            <CirclePlus />
            <span>{t("Unpublish")}</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActionButton;
