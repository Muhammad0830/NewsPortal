"use client";

import { ColumnDef } from "@tanstack/react-table";
import TableActionButton from "@/components/TableActionButton";
import { Payment } from "@/types/types";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: "Title",
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
    accessorKey: "createdAt",
    header: "Created At",
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
