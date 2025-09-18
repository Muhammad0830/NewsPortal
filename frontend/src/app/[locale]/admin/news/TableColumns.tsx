"use client";

import { ColumnDef } from "@tanstack/react-table";
import TableActionButton from "@/components/TableActionButton";
import { News } from "@/types/types";

export const columns: ColumnDef<News>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="h-full lg:max-w-[350px] md:max-w-[250px] max-w-[200px] overflow-hidden relative truncate">
          {row.original.title}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.created_at);
      const hours = createdAt.getHours().toString().padStart(2, "0");
      const minutes = createdAt.getMinutes().toString().padStart(2, "0");
      return (
        <div>
          {createdAt.toLocaleDateString()} {hours}:{minutes}
        </div>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original;

      return <TableActionButton payment={payment} />;
    },
  },
];
