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
import { Button } from "~/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Moon,
  PlusCircle,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import CreateServiceDialog from "~/components/create-service-dialog";
import DataTableNavigation from "~/components/data-table-navigation";

const company_name = import.meta.env.VITE_COMPANY_NAME;

export function meta({}: Route.MetaArgs) {
  return [{ title: `${company_name} | Services` }];
}

export default function ServicesPage({}: Route.ComponentProps) {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<number>(30);

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const { data, isLoading, isFetching, refetch } = useGetAllServicesQuery({
    page: page,
    search: search,
    results: results,
  });

  const isLoadingData = isLoading || isFetching;
  const isNotMobile = useMediaQuery({ query: "(min-width: 768px)" });

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
      cell: ({ row }) => (
        <div className="min-w-[300px]">{row.getValue("name")}</div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "unit_type",
      header: isNotMobile ? "Unit of measurement" : "Unit",
    },
    {
      accessorKey: "rate",
      header: isNotMobile ? "Rate per unit" : "Rate",
      cell: ({ row }) => <div>{row.getValue("rate")}</div>,
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
        <DataTable
          isLoading={isLoadingData}
          table={table}
          actions={
            <div className="flex w-full gap-2 items-center">
              <Button
                size="icon"
                disabled={isLoadingData}
                onClick={() => refetch()}
              >
                <RefreshCcw className={isLoadingData ? "animate-spin" : ""} />
              </Button>
              <CreateServiceDialog
                trigger={
                  <Button
                    size={isNotMobile ? "default" : "icon"}
                    disabled={isLoadingData}
                  >
                    <PlusCircle /> {isNotMobile && "Add"}
                  </Button>
                }
              />
              <Button
                disabled={
                  isLoadingData ||
                  !(
                    table.getIsSomeRowsSelected() ||
                    table.getIsAllPageRowsSelected()
                  )
                }
              >
                <Trash2 /> {isNotMobile && "Delete"}
              </Button>
              <Separator orientation="vertical" />
              <div className="w-full gap-2 items-center">
                <Input className="w-full" placeholder="Search" />
              </div>
            </div>
          }
        />
        <DataTableNavigation table={table} />
      </div>
    </div>
  );
}
