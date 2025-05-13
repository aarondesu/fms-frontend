import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTable } from "~/components/ui/data-table";
import {
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "~/redux/api/adminApi";
import dayjs from "dayjs";
import type { AdminUser } from "~/types";
import { Button } from "~/components/ui/button";
import { RefreshCcw, Search, Trash2, UserPlus2 } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { useMediaQuery } from "react-responsive";
import ConfirmationDialog from "~/components/confirmation-dialog";
import CreateAdminDialog from "~/components/create-admin-dialog";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import DataTableNavigation from "~/components/data-table-navigation";
import type { Route } from "./+types/admins";

const company_name = import.meta.env.VITE_COMPANY_NAME;

export function meta() {
  return [{ title: `${company_name} | Administrators` }];
}

export default function AdminsPage({}: Route.ComponentProps) {
  const [deleteAdmin] = useDeleteAdminMutation();

  const [search, setSearch] = useState<string>("");
  let [searchParams, setSearchParams] = useSearchParams();
  //const page = Number(searchParams.get("page")) || 1;
  const [pagination, setPaginationState] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isFetching, refetch } = useGetAllAdminQuery({
    page: pagination.pageIndex + 1,
    results: 100,
    search: search,
  });

  const isLoadingData = isLoading;
  const isNotMobile = useMediaQuery({ query: "(min-width: 768px)" });

  const columns: ColumnDef<AdminUser>[] = [
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
    columns: columns,
    data: data?.list || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
                <RefreshCcw className={isLoadingData ? "animate-spin" : ""} />
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
                    disabled={
                      !(
                        table.getIsSomeRowsSelected() ||
                        table.getIsAllPageRowsSelected()
                      )
                    }
                  >
                    <Trash2 /> {isNotMobile && "Delete"}
                  </Button>
                }
                action={() => {
                  let admin_ids: number[] = table
                    .getFilteredSelectedRowModel()
                    .rows.map((admin) => admin.original.id || 0);

                  toast.promise(deleteAdmin(admin_ids).unwrap(), {
                    loading: "Deleting selected admins...",
                    success: () => {
                      table.resetRowSelection();
                      return "Successfully removed selected administrators";
                    },
                    error: (error) => {
                      const message = error.data.errors[0];
                      return message;
                    },
                  });
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
        <DataTableNavigation table={table} />
      </div>
    </div>
  );
}
