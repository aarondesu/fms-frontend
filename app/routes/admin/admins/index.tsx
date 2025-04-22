import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "~/components/ui/data-table";
import { useGetAllAdminQuery } from "~/redux/api/adminApi";
import dayjs from "dayjs";
import type { User } from "~/types";
import { Button } from "~/components/ui/button";
import { RefreshCcw, Search, Trash2, UserPlus2 } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { useMediaQuery } from "react-responsive";

export function meta() {
  return [{ title: "Admins" }];
}

export default function AdminsPage() {
  const [search, setSearch] = useState<string>();
  const [page, setpPage] = useState<number>();
  const { data, isLoading, isFetching, refetch } = useGetAllAdminQuery({
    page: page,
    search: search,
  });

  const isLoadingData = isLoading || isFetching;
  const isNotMobile = useMediaQuery({ query: "(min-width: 768px)" });

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      enableHiding: false,
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomeRowsSelected() && "indeterminate")
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
      accessorKey: "username",
      header: "Username",
      enableHiding: false,
    },
    {
      accessorKey: "created_at",
      header: "Date Created",
      cell: ({ row }) => {
        const date = row.getValue("created_at") as string;
        const formatted = dayjs(date).toString();

        return <>{formatted}</>;
      },
    },
  ];

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    columns: columns,
    data: data?.list || [],
  });

  return (
    <div className="p-2 space-y-4">
      <h3 className="text-3xl font-black">Admins</h3>
      <div className="">
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
                <RefreshCcw />
              </Button>
              <Button>
                <UserPlus2 /> {isNotMobile && "Add"}
              </Button>
              <Button>
                <Trash2 /> {isNotMobile && "Delete"}
              </Button>
              <Separator orientation="vertical" />
              <div className="flex grow gap-2 items-center">
                <Input
                  className="grow"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.currentTarget.value)}
                />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
