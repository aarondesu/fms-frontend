import { useGetAllServicesQuery } from "~/redux/api/serviceApi";
import type { Route } from "./+types/services";
import { useState } from "react";
import { useSearchParams } from "react-router";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { Service } from "~/types";
import { Checkbox } from "~/components/ui/checkbox";
import { DataTable } from "~/components/ui/data-table";

const company_name = import.meta.env.VITE_COMPANY_NAME;

export function meta({}: Route.MetaArgs) {
  return [{ title: `${company_name} | Services` }];
}

export default function ServicesPage({}: Route.ComponentProps) {
  const [search, setSearch] = useState<string>("");
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, isFetching } = useGetAllServicesQuery({
    page: page,
    search: search,
  });

  const isLoadingData = isLoading || isFetching;

  const columns: ColumnDef<Service>[] = [
    {
      id: "select",
      enableHiding: false,
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select All"
          disabled={isLoadingData}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select Row"
          disabled={isLoadingData}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ cell }) => (
        <div className="min-h-300px">
          {cell.getValue()}
        </div>
      ),
      enableHiding: false,
    },
  ];

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns: columns,
    data: data?.list || [],
  });

  return (
    <div className="p-2 space-y-4">
      <h3 className="text-3xl font-black">Services</h3>
      <div className="space-y-2">
        <DataTable isLoading={isLoadingData} table={table} />
      </div>
    </div>
  );
}
