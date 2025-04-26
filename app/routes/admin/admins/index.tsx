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
import ConfirmationDialog from "~/components/ConfirmationDialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationNumbers,
  PaginationPrevious,
} from "~/components/ui/pagination";
import CreateAdminDialog from "~/components/CreateAdminDialog";
import { useSearchParams } from "react-router";

const company_name = import.meta.env.VITE_COMPANY_NAME;

export function meta() {
  return [{ title: `${company_name} | Admins` }];
}

export default function AdminsPage() {
  const [search, setSearch] = useState<string>("");
  let [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
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
        const formatted = dayjs(date).format("DD/MM/YYYY").toString();

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
                <RefreshCcw />
              </Button>
              <CreateAdminDialog
                trigger={
                  <Button
                    size={isNotMobile ? "default" : "icon"}
                    disabled={isLoadingData}
                  >
                    <UserPlus2 /> {isNotMobile && "Add"}
                  </Button>
                }
              />
              <ConfirmationDialog
                title="Delete Admin"
                description="Are you sure you want to delete the selected admin/s? Action is irreversible."
                trigger={
                  <Button
                    size={isNotMobile ? "default" : "icon"}
                    disabled={!table.getIsSomeRowsSelected()}
                  >
                    <Trash2 /> {isNotMobile && "Delete"}
                  </Button>
                }
                action={() => {
                  console.log("tes");
                }}
              />
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
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`?page=${page - 1}`} />
              </PaginationItem>
            )}
            <PaginationNumbers pages={data?.lastPage || 1} currentPage={page} />
            {page < (data?.lastPage || 1) && (
              <PaginationItem>
                <PaginationNext href={`?page=${page + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
