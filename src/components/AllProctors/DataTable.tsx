import React, { useEffect } from "react";
import { GripHorizontal, ChevronsUpDown } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllProctorsMutation } from "../api";
import { useSearchParams } from "react-router-dom";
import CreateProctorModal from "./CreateProctorModal";

export type Payment = {
  id: number;
  organizationId: number;
  name: string;
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "organizationId",
    header: () => <div className="text-right">organizationId</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.getValue("organizationId")}
        </div>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "Actions",
    enableHiding: false,
    cell: () => {
      //   console.log(row?.original?.id);
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <GripHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>Remove Proctor</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  let [searchParams, setSearchParams] = useSearchParams();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Payment[]>([]);
  const [count, setCount] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const { mutate: getFilteredProductsFn } = useGetAllProctorsMutation();

  interface IProps {
    limit: number;
    offset: number;
  }

  const getFilteredProducts = (body: IProps) => {
    getFilteredProductsFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          setData((prev) => {
            return data?.data?.proctors;
          });
          setCount((prev) => {
            return data?.data?.count;
          });
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  useEffect(() => {
    getFilteredProducts({
      limit: 10,
      offset:
        Number(searchParams.get("page")) >= 1
          ? (Number(searchParams.get("page")) - 1) * 10
          : 0,
    });
  }, [searchParams]);

  return (
    <div className="w-full">
      <CreateProctorModal open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between py-4">
        <h1 className="text-xl font-semibold">All Protors</h1>
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Proctor
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id} // ???
                  data-state={row.getIsSelected() && "selected"}
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
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              let page = Number(searchParams.get("page"));
              page -= 1;
              setSearchParams({ page: String(page) });
            }}
            disabled={Number(searchParams.get("page")) === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              let page = Number(searchParams.get("page"));
              page += 1;
              setSearchParams({ page: String(page) });
            }}
            disabled={Number(searchParams.get("page")) * 10 > count}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
