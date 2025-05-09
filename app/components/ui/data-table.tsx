import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type Table as ReactTable,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { Settings2 } from "lucide-react";
import { useMediaQuery } from "react-responsive";

interface DataTableProps<TData, TValue> {
  columns?: ColumnDef<TData, TValue>[];
  data?: TData[];
  isLoading: boolean;
  actions?: React.JSX.Element | React.JSX.Element[] | React.ReactNode;
  before?: React.ReactNode;
  finalRow?: React.ReactNode;
  hideColumns?: boolean;
  table?: ReactTable<TData>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  actions,
  finalRow,
  hideColumns = true,
  before,
  table,
}: DataTableProps<TData, TValue>) {
  const [open, setOpen] = useState<boolean>(false);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const isNotMobile = useMediaQuery({ query: "(min-width: 768px)" });

  if (!table) {
    table = useReactTable({
      columns: columns || [],
      data: data || [],
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        columnVisibility,
        rowSelection: rowSelection,
      },
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="flex grow gap-2">{actions}</div>
        <div className="">
          {hideColumns && (
            <DropdownMenu onOpenChange={setOpen} open={open}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size={isNotMobile ? "default" : "icon"}
                  className="ml-auto"
                >
                  <Settings2 className="md:mr-4 w-4 h-4" />
                  <span className="hidden md:block">Columns</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => {
                          column.toggleVisibility(!!value);
                          setOpen(true);
                        }}
                      >
                        {column.columnDef.header as string}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      {before && before}
      <div className="p-4 border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!isLoading && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "isSelected"}
                  onClick={row.getToggleSelectedHandler()}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="">
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="font-bold text-center"
                >
                  {isLoading ? "Loading data..." : "No records available"}
                </TableCell>
              </TableRow>
            )}
            {finalRow && finalRow}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
